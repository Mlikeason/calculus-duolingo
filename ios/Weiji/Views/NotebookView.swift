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
            do {
                let saved = try PKDrawing(data: Data(contentsOf: url))
                // This notebook has always offered a single monochrome pen.
                // Older builds persisted dynamic .label as white in dark traits.
                drawing = PKDrawing(strokes: saved.strokes.map { original in
                    var stroke = original
                    stroke.ink = PKInk(original.ink.inkType, color: .black)
                    return stroke
                })
            }
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
    var tool: PKTool { erase ? PKEraserTool(.vector) : PKInkingTool(.pen, color: .black, width: 3) }
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
        canvas.overrideUserInterfaceStyle = .light
        canvas.backgroundColor = .white
        canvas.isScrollEnabled = true
        canvas.contentSize = CGSize(width: 1000, height: 1400)
        canvas.accessibilityLabel = "手写草稿，支持手指或 Apple Pencil"
        canvas.accessibilityIdentifier = "notebookCanvas"
        canvas.drawing = notebook.drawing
        canvas.tool = notebook.tool
        context.coordinator.erase = notebook.erase
        canvas.delegate = context.coordinator
        notebook.canvas = canvas
        return canvas
    }
    func updateUIView(_ uiView: PKCanvasView, context: Context) {
        if context.coordinator.erase != notebook.erase {
            uiView.tool = notebook.tool
            context.coordinator.erase = notebook.erase
        }
    }
    static func dismantleUIView(_ uiView: PKCanvasView, coordinator: Coordinator) {
        uiView.delegate = nil
    }
    @MainActor final class Coordinator: NSObject, PKCanvasViewDelegate {
        let notebook: Notebook
        var erase = false
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
                Label("手写草稿", systemImage: "pencil.tip").font(.caption.weight(.semibold)).foregroundStyle(.secondary)
                Spacer()
                Button { notebook.canvas?.undoManager?.undo() } label: { Image(systemName: "arrow.uturn.backward") }.accessibilityLabel("撤销笔画")
                Button {
                    notebook.erase.toggle()
                } label: { Image(systemName: notebook.erase ? "pencil.tip" : "eraser") }.accessibilityLabel(notebook.erase ? "切换为画笔" : "切换为橡皮擦")
                Button { clearing = true } label: { Image(systemName: "trash") }.accessibilityLabel("清空本节草稿")
            }.buttonStyle(.borderless).controlSize(.regular).padding(.horizontal, 12).frame(minHeight: 44)
            Divider()
            PencilCanvas(notebook: notebook)
        }
        .confirmationDialog("清空本节手写草稿？", isPresented: $clearing, titleVisibility: .visible) {
            Button("清空草稿", role: .destructive) { notebook.clear() }
        }
        .alert("草稿提示", isPresented: Binding(get: { notebook.error != nil }, set: { if !$0 { notebook.error = nil } })) {
            Button("知道了") { notebook.error = nil }
        } message: { Text(notebook.error ?? "") }
    }
}
