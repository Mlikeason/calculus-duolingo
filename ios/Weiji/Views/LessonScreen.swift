import SwiftUI

struct LessonScreen: View {
    let unit: CourseUnit
    @Bindable var store: LearningStore
    let review: Bool
    @State private var notebook: Notebook
    @State private var compactPage = 0
    @State private var workspacePage = 2
    @State private var webError: String?
    @Environment(\.dismiss) private var dismiss
    @Environment(\.horizontalSizeClass) private var horizontalSizeClass
    @Environment(\.dynamicTypeSize) private var dynamicTypeSize
    @Environment(\.scenePhase) private var scenePhase
    init(unit: CourseUnit, store: LearningStore, review: Bool) {
        self.unit = unit; self.store = store; self.review = review
        _notebook = State(initialValue: Notebook(unitID: unit.id, directory: store.directory))
    }
    var session: LessonSession? { store.session(for: unit) }
    var preview: Bool { !store.isUnlocked(unit) }
    var body: some View {
        NavigationStack {
            GeometryReader { geometry in
                let expanded = horizontalSizeClass == .regular && geometry.size.width >= 600 && !dynamicTypeSize.isAccessibilitySize
                VStack(spacing: 8) {
                    if let session, !preview {
                        HStack(spacing: 10) {
                            Text(session.isReview ? "错题复习" : session.position < 0 ? "课程讲解" : "随堂练习").font(.caption.weight(.medium))
                            ProgressView(value: Double(min(max(session.position, 0), session.queue.count)), total: Double(session.queue.count))
                                .frame(maxWidth: 150).accessibilityLabel("本节进度")
                            Text("\(min(max(session.position, 0), session.queue.count)) / \(session.queue.count)").font(.caption.monospacedDigit()).foregroundStyle(.secondary)
                            Spacer(minLength: 0)
                            if expanded {
                                Menu {
                                    Picker("工作区", selection: $workspacePage) {
                                        Text("图形与草稿").tag(2)
                                        Text("只看图形").tag(0)
                                        Text("只看草稿").tag(1)
                                    }
                                } label: { Label("布局", systemImage: "rectangle.split.2x2").font(.caption) }
                            }
                        }
                    }
                    if !expanded && session?.isFinished != true {
                        Picker("学习工具", selection: $compactPage) {
                            Text("学习").tag(0); Text("参考").tag(1); Text("草稿").tag(2)
                        }.pickerStyle(.segmented).accessibilityIdentifier("learningTools")
                    }
                    if session?.isFinished == true && !preview {
                        completion
                    } else {
                        let showLesson = expanded || compactPage == 0
                        let showReference = expanded ? workspacePage != 1 : compactPage == 1
                        let showNotebook = expanded ? workspacePage != 0 : compactPage == 2
                        StudyWorkspaceLayout(expanded: expanded, together: workspacePage == 2) {
                            VStack(spacing: 0) {
                                lessonContent
                                lessonAction
                            }.background(Theme.card, in: RoundedRectangle(cornerRadius: 14))
                                .clipShape(RoundedRectangle(cornerRadius: 14))
                                .opacity(showLesson ? 1 : 0)
                                .allowsHitTesting(showLesson).accessibilityHidden(!showLesson)
                            VStack(spacing: 0) {
                                HStack {
                                    Label("图形与概念", systemImage: "chart.xyaxis.line")
                                    Spacer()
                                }.font(.caption.weight(.semibold)).foregroundStyle(.secondary).padding(.horizontal, 12).padding(.vertical, 9)
                                Divider()
                                web(mode: "reference")
                            }.background(Theme.card, in: RoundedRectangle(cornerRadius: 14)).clipShape(RoundedRectangle(cornerRadius: 14))
                                .opacity(showReference ? 1 : 0)
                                .allowsHitTesting(showReference).accessibilityHidden(!showReference)
                            NotebookView(notebook: notebook)
                                .background(Theme.card, in: RoundedRectangle(cornerRadius: 14)).clipShape(RoundedRectangle(cornerRadius: 14))
                                .opacity(showNotebook ? 1 : 0)
                                .allowsHitTesting(showNotebook).accessibilityHidden(!showNotebook)
                        }
                    }
                }
                .padding(10)
                .frame(maxWidth: .infinity, maxHeight: .infinity)
            }.background(Theme.background)
            .navigationTitle(unit.title).navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button { notebook.save(); store.save(); dismiss() } label: { Label("保存并退出", systemImage: "xmark") }.accessibilityIdentifier("closeLesson")
                }
            }
        }
        .onAppear { if !preview { store.start(unit, review: review) } }
        .onDisappear { notebook.save(); store.save() }
        .onChange(of: scenePhase) { _, phase in if phase != .active { notebook.save(); store.save() } }
        .alert("内容显示提示", isPresented: Binding(get: { webError != nil }, set: { if !$0 { webError = nil } })) {
            Button("知道了") { webError = nil }
        } message: { Text(webError ?? "") }
    }
    var canAdvance: Bool {
        guard let session else { return false }
        if session.position == -1 { return true }
        guard let index = session.exerciseIndex else { return false }
        return session.answers[index] != nil
    }
    var lessonContent: some View { web(mode: session?.exerciseIndex != nil && !preview ? "exercise" : "intro") }
    var lessonAction: some View {
        VStack(spacing: 0) {
            Divider()
            if preview {
                Label("完成前面的课程后解锁练习", systemImage: "lock")
                    .font(.caption).foregroundStyle(.secondary).padding(10)
            } else {
                Button { store.advance(unit); compactPage = 0 } label: {
                    HStack(spacing: 8) {
                        Text(session?.position == -1 ? "开始练习" : "继续")
                        Image(systemName: "arrow.right")
                    }.font(.subheadline.weight(.semibold))
                        .frame(maxWidth: .infinity, minHeight: 44)
                        .foregroundStyle(canAdvance ? Color.white : Color.secondary)
                        .background(canAdvance ? Theme.accent : Color.secondary.opacity(0.12), in: RoundedRectangle(cornerRadius: 10))
                }.buttonStyle(.plain).disabled(!canAdvance).accessibilityIdentifier("nextStep")
                    .padding(.horizontal, 10).padding(.vertical, 6)
            }
        }
    }
    func web(mode: String) -> some View {
        let s = session
        let index = s?.exerciseIndex
        let exercise = index.map { unit.exercises[$0] }
        let payload = LessonPayload(key: s?.id.uuidString ?? unit.id, mode: mode, title: unit.title, intro: unit.intro,
                                    exercise: exercise, index: index, number: (s?.position ?? 0) + 1, total: s?.queue.count ?? unit.exercises.count,
                                    order: index.flatMap { s?.optionOrders[$0] } ?? Array(exercise?.options?.indices ?? 0..<0),
                                    draft: index.flatMap { s?.drafts[$0] } ?? "", submitted: index.flatMap { s?.answers[$0] },
                                    visualValues: s?.visualValues ?? [:])
        return LessonWebView(payload: payload, onMessage: handle, onError: { webError = $0 })
            .background(Theme.card).clipShape(RoundedRectangle(cornerRadius: 22))
    }
    func handle(_ message: [String: Any]) {
        guard !preview else { return }
        switch message["type"] as? String {
        case "draft":
            if let index = message["index"] as? Int, let text = message["text"] as? String { store.draft(text, unitID: unit.id, index: index) }
        case "answer":
            guard let index = message["index"] as? Int else { return }
            if let correct = store.answer(unitID: unit.id, index: index, text: message["text"] as? String ?? "", choice: message["choice"] as? Int) {
                UINotificationFeedbackGenerator().notificationOccurred(correct ? .success : .warning)
            }
        case "visual": if let values = message["values"] as? [String: String] { store.setVisual(values, unitID: unit.id) }
        default: break
        }
    }
    var completion: some View {
        ScrollView {
            VStack(spacing: 24) {
                Image(systemName: "checkmark.seal.fill").font(.system(size: 64)).foregroundStyle(Theme.accent)
                Text("练习完成") .font(.title).multilineTextAlignment(.center)
                if let s = session { Text("本次答对 \(s.correctCount) / \(s.queue.count) 道") .font(.title3).foregroundStyle(.secondary) }
                Button("返回学习路线") { dismiss() }.buttonStyle(.borderedProminent).controlSize(.large)
                if store.progress.mistakes.contains(where: { $0.hasPrefix(unit.id + ":") }) {
                    Button("巩固本节错题") { store.start(unit, review: true, restart: true) }.buttonStyle(.bordered).controlSize(.large)
                }
                Button("完整重做本节") { store.start(unit, restart: true) }
            }.padding(32).frame(maxWidth: .infinity)
        }.frame(maxHeight: .infinity).background(Theme.card, in: RoundedRectangle(cornerRadius: 24))
    }
}

// All three children remain mounted, with explicit nonzero viewport sizes.
// This avoids replacing PencilKit / WebKit surfaces when the device folds.
struct StudyWorkspaceLayout: Layout {
    let expanded: Bool
    let together: Bool
    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        CGSize(width: proposal.width ?? 600, height: proposal.height ?? 600)
    }
    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        guard subviews.count == 3 else { return }
        let gap: CGFloat = 8
        var frames = Array(repeating: bounds, count: 3)
        if expanded {
            if together && bounds.width >= 800 {
                let width = (bounds.width - 2 * gap) / 3
                frames = (0..<3).map { CGRect(x: bounds.minX + CGFloat($0) * (width + gap), y: bounds.minY, width: width, height: bounds.height) }
            } else {
                let lessonWidth = (bounds.width - gap) * 0.46
                let right = CGRect(x: bounds.minX + lessonWidth + gap, y: bounds.minY, width: bounds.width - lessonWidth - gap, height: bounds.height)
                frames[0] = CGRect(x: bounds.minX, y: bounds.minY, width: lessonWidth, height: bounds.height)
                frames[1] = right; frames[2] = right
                if together {
                    let studyHeight = (bounds.height - gap) * 0.56
                    frames[0].size.height = studyHeight
                    frames[1].size.height = studyHeight
                    frames[2] = CGRect(x: bounds.minX, y: bounds.minY + studyHeight + gap, width: bounds.width, height: bounds.height - studyHeight - gap)
                }
            }
        }
        for (index, view) in subviews.enumerated() {
            let frame = frames[index]
            view.place(at: frame.origin, anchor: .topLeading, proposal: ProposedViewSize(width: max(1, frame.width), height: max(1, frame.height)))
        }
    }
}
