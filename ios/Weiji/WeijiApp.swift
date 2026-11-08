import SwiftUI

@main struct WeijiApp: App {
    @State private var store: LearningStore?
    @State private var loadError: String?
    init() {
        do {
            var directory: URL?
            #if DEBUG
            if ProcessInfo.processInfo.arguments.contains("--ui-testing") {
                directory = URL.applicationSupportDirectory.appendingPathComponent("WeijiUITesting")
                if ProcessInfo.processInfo.arguments.contains("--reset-test-data"), let directory {
                    try? FileManager.default.removeItem(at: directory)
                }
            }
            #endif
            _store = State(initialValue: LearningStore(modules: try Curriculum.load(), directory: directory))
        }
        catch { _loadError = State(initialValue: error.localizedDescription) }
    }
    var body: some Scene {
        WindowGroup {
            if let store { RootView(store: store).tint(Theme.accent) }
            else { ContentUnavailableView("课程未能载入", systemImage: "exclamationmark.book.closed", description: Text(loadError ?? "请重新安装 App，或联系 zivzhu@gmail.com。")) }
        }
    }
}

enum Theme {
    static let accent = Color(light: UIColor(red: 0.17, green: 0.30, blue: 0.49, alpha: 1), dark: UIColor(red: 0.58, green: 0.73, blue: 0.95, alpha: 1))
    static let background = Color(light: UIColor(red: 0.95, green: 0.96, blue: 0.98, alpha: 1), dark: .systemGroupedBackground)
    static let card = Color(.secondarySystemGroupedBackground)
}
extension Color {
    init(light: UIColor, dark: UIColor) { self.init(uiColor: UIColor { $0.userInterfaceStyle == .dark ? dark : light }) }
}
