import SwiftUI
import WebKit

struct LessonPayload: Encodable {
    let key: String
    let mode: String
    let title: String
    let intro: Introduction
    let exercise: Exercise?
    let index: Int?
    let number: Int
    let total: Int
    let order: [Int]
    let draft: String
    let submitted: SubmittedAnswer?
    let visualValues: [String: String]
    var fontScale: Double = 1
}

struct LessonWebView: UIViewRepresentable {
    var payload: LessonPayload
    let onMessage: ([String: Any]) -> Void
    let onError: (String) -> Void
    @Environment(\.dynamicTypeSize) private var typeSize
    func makeCoordinator() -> Coordinator { Coordinator(self) }
    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.websiteDataStore = .nonPersistent()
        config.userContentController.add(context.coordinator, name: "lesson")
        let web = WKWebView(frame: .zero, configuration: config)
        web.isOpaque = false
        web.backgroundColor = .clear
        web.scrollView.backgroundColor = .clear
        web.navigationDelegate = context.coordinator
        web.allowsLinkPreview = false
        if let url = Bundle.main.url(forResource: "renderer", withExtension: "html", subdirectory: "Content") {
            web.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        } else { onError("离线课程资源缺失，请重新安装应用。") }
        return web
    }
    func updateUIView(_ web: WKWebView, context: Context) {
        context.coordinator.parent = self
        context.coordinator.render(web)
    }
    static func dismantleUIView(_ web: WKWebView, coordinator: Coordinator) {
        web.configuration.userContentController.removeScriptMessageHandler(forName: "lesson")
        web.navigationDelegate = nil
    }
    var encoded: String? {
        var adjusted = payload
        switch typeSize {
        case .xSmall, .small: adjusted.fontScale = 0.9
        case .xLarge: adjusted.fontScale = 1.12
        case .xxLarge: adjusted.fontScale = 1.24
        case .xxxLarge: adjusted.fontScale = 1.38
        case .accessibility1: adjusted.fontScale = 1.55
        case .accessibility2: adjusted.fontScale = 1.75
        case .accessibility3, .accessibility4, .accessibility5: adjusted.fontScale = 2
        default: break
        }
        return (try? JSONEncoder().encode(adjusted)).flatMap { String(data: $0, encoding: .utf8) }
    }
    @MainActor final class Coordinator: NSObject, WKScriptMessageHandler, WKNavigationDelegate {
        var parent: LessonWebView
        var ready = false
        var lastJSON: String?
        init(_ parent: LessonWebView) { self.parent = parent }
        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            guard message.frameInfo.isMainFrame, message.frameInfo.request.url?.isFileURL == true,
                  let body = message.body as? [String: Any] else { return }
            parent.onMessage(body)
        }
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) { ready = true; lastJSON = nil; render(webView) }
        func render(_ web: WKWebView) {
            guard ready, let json = parent.encoded, json != lastJSON else { return }
            lastJSON = json
            Task { @MainActor [weak self] in
                do { _ = try await web.callAsyncJavaScript("window.renderLesson(JSON.parse(json));", arguments: ["json": json], in: nil, contentWorld: .page) }
                catch { self?.parent.onError("课程显示失败：\(error.localizedDescription)") }
            }
        }
        func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping @MainActor (WKNavigationActionPolicy) -> Void) {
            // The renderer has no network access or external navigation. Only bundled files may load.
            let url = navigationAction.request.url
            decisionHandler(url?.isFileURL == true ? .allow : .cancel)
        }
        func webViewWebContentProcessDidTerminate(_ webView: WKWebView) { ready = false; lastJSON = nil; webView.reload() }
        func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) { parent.onError(error.localizedDescription) }
    }
}
