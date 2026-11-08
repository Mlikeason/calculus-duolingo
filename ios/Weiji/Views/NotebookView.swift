import SwiftUI
import PencilKit
import Observation

@MainActor @Observable final class Notebook {
    private(set) var drawing = PKDrawing()
    @ObservationIgnored weak var canvas: PKCanvasView?
    let url: URL
    var error: String?
    var revision = 0
    var erase = false
    private var pending: Task<Void, Never>?
    init(unitID: String, directory: URL) {
        url = directory.appendingPathComponent("Drawings", isDirectory: true).appendingPathComponent(unitID + ".drawing")
        if FileManager.default.fileExists(atPath: url.path) {
            do { drawing = try PKDrawing(data: Data(contentsOf: url)) }
            catch { self.error = "草稿未能读取：\(error.localizedDescription)" }
        }
    }
    func changed(_ drawing: PKDrawing) {
        self.drawing = drawing
        revision += 1
        pending?.cancel()
        pending = Task { [weak self] in
            do { try await Task.sleep(for: .milliseconds(350)) } catch { return }
            self?.save()
        }
    }
    func save() {
        pending?.cancel()
        do {
            try FileManager.default.createDirectory(at: url.deletingLastPathComponent(), withIntermediateDirectories: true)
            try drawing.dataRepresentation().write(to: url, options: .atomic)
        } catch { self.error = "草稿未能保存：\(error.localizedDescription)" }
    }
    var tool: PKTool { erase ? PKEraserTool(.vector) : PKInkingTool(.pen, color: .label, width: 3) }
    func clear() { drawing = PKDrawing(); canvas?.drawing = drawing; revision += 1; save() }
}

struct PencilCanvas: UIViewRepresentable {
    let notebook: Notebook
    func makeCoordinator() -> Coordinator { Coordinator(notebook) }
    func makeUIView(context: Context) -> PKCanvasView {
        // Keep durable strokes separate from the transient UIKit surface:
        // folding and rotation may rebuild this SwiftUI branch.
        let canvas = PKCanvasView()
        canvas.drawingPolicy = .anyInput
        canvas.backgroundColor = .secondarySystemGroupedBackground
        canvas.isScrollEnabled = true
        canvas.contentSize = CGSize(width: 1000, height: 1400)
        canvas.accessibilityLabel = "手写草稿，支持手指或 Apple Pencil"
        canvas.drawing = notebook.drawing
        canvas.tool = notebook.tool
        canvas.delegate = context.coordinator
        notebook.canvas = canvas
        return canvas
    }
    func updateUIView(_ uiView: PKCanvasView, context: Context) { uiView.tool = notebook.tool }
    static func dismantleUIView(_ uiView: PKCanvasView, coordinator: Coordinator) {
        uiView.delegate = nil
    }
    @MainActor final class Coordinator: NSObject, PKCanvasViewDelegate {
        let notebook: Notebook
        init(_ notebook: Notebook) { self.notebook = notebook }
        func canvasViewDrawingDidChange(_ canvasView: PKCanvasView) {
            guard notebook.canvas === canvasView else { return }
            notebook.changed(canvasView.drawing)
        }
    }
}

struct NotebookView: View {
    @Bindable var notebook: Notebook
    @State private var clearing = false
    var body: some View {
        VStack(spacing: 0) {
            HStack {
                Text("留一点推演的空间").font(.caption).foregroundStyle(.secondary)
                Spacer()
                Button { notebook.canvas?.undoManager?.undo() } label: { Image(systemName: "arrow.uturn.backward") }.accessibilityLabel("撤销笔画")
                Button {
                    notebook.erase.toggle()
                } label: { Image(systemName: notebook.erase ? "pencil.tip" : "eraser") }.accessibilityLabel(notebook.erase ? "切换为画笔" : "切换为橡皮擦")
                Button { clearing = true } label: { Image(systemName: "trash") }.accessibilityLabel("清空本节草稿")
            }.buttonStyle(.bordered).controlSize(.regular).padding(12)
            Divider()
            PencilCanvas(notebook: notebook)
            Text("支持手指与 Apple Pencil · 自动保存").font(.caption2).foregroundStyle(.secondary).padding(8)
        }
        .confirmationDialog("清空本节手写草稿？", isPresented: $clearing, titleVisibility: .visible) {
            Button("清空草稿", role: .destructive) { notebook.clear() }
        }
        .alert("草稿提示", isPresented: Binding(get: { notebook.error != nil }, set: { if !$0 { notebook.error = nil } })) {
            Button("知道了") { notebook.error = nil }
        } message: { Text(notebook.error ?? "") }
    }
}
