import SwiftUI

struct LessonDestination: Identifiable {
    let unit: CourseUnit
    var review = false
    var id: String { unit.id }
}
struct RootView: View {
    @Bindable var store: LearningStore
    @State private var selectedModule: String?
    @State private var destination: LessonDestination?
    var body: some View {
        TabView {
            NavigationSplitView {
                List(selection: $selectedModule) {
                    Section {
                        VStack(alignment: .leading, spacing: 9) {
                            Text("细微处，积跬步。") .font(.title2.weight(.medium)).fontDesign(.serif)
                            Text("每天一点，理解变化与累积。") .font(.subheadline).foregroundStyle(.secondary)
                        }.padding(.vertical, 12)
                        if let unit = store.resumeUnit {
                            Button { open(unit) } label: {
                                VStack(alignment: .leading, spacing: 8) {
                                    Label("继续学习", systemImage: "play.circle.fill").font(.headline)
                                    Text(unit.title).font(.subheadline).foregroundStyle(.secondary)
                                }.padding(.vertical, 8)
                            }.accessibilityIdentifier("resumeLesson")
                        }
                    }
                    Section("学习路线 · 5 个模块") {
                        ForEach(store.modules) { module in
                            NavigationLink(value: module.id) {
                                HStack(spacing: 14) {
                                    Image(systemName: module.symbol).font(.title3).foregroundStyle(Theme.accent).frame(width: 30)
                                    VStack(alignment: .leading, spacing: 5) {
                                        Text(module.shortTitle).font(.headline)
                                        Text("\(done(module)) / \(module.units.count) 节").font(.caption).foregroundStyle(.secondary)
                                    }
                                }.padding(.vertical, 7)
                            }
                        }
                    }
                    Section {
                        Label("78 节微课，随时离线学习", systemImage: "checkmark.icloud")
                            .font(.footnote).foregroundStyle(.secondary)
                    }
                }
                .navigationTitle("微/积")
                .navigationSplitViewColumnWidth(min: 250, ideal: 290, max: 340)
            } detail: {
                if let module = store.modules.first(where: { $0.id == selectedModule }) {
                    ModuleView(module: module, store: store, open: open)
                } else {
                    OverviewView(store: store, open: open)
                }
            }
            .tabItem { Label("学习", systemImage: "book.closed") }
            NavigationStack {
                List {
                    if store.progress.mistakes.isEmpty {
                        ContentUnavailableView("给理解一次巩固", systemImage: "checkmark.seal", description: Text("答错的题会自动收集在这里。重做答对后，它们就会从错题本移出。"))
                    } else {
                        Section("按课程复习") {
                            ForEach(store.units.filter { unit in store.progress.mistakes.contains { $0.hasPrefix(unit.id + ":") } }) { unit in
                                Button { destination = LessonDestination(unit: unit, review: true) } label: {
                                    HStack {
                                        VStack(alignment: .leading, spacing: 6) {
                                            Text(unit.title).foregroundStyle(.primary)
                                            Text("\(store.progress.mistakes.filter { $0.hasPrefix(unit.id + ":") }.count) 道待巩固").font(.caption).foregroundStyle(.secondary)
                                        }
                                        Spacer(); Image(systemName: "arrow.right.circle")
                                    }.padding(.vertical, 6)
                                }
                            }
                        }
                    }
                }.navigationTitle("错题本")
            }.tabItem { Label("复习", systemImage: "arrow.counterclockwise") }
            NavigationStack { ProgressScreen(store: store) }
                .tabItem { Label("足迹", systemImage: "chart.bar.xaxis") }
            NavigationStack { SettingsScreen(store: store) }
                .tabItem { Label("设置", systemImage: "gearshape") }
        }
        .fullScreenCover(item: $destination) { item in LessonScreen(unit: item.unit, store: store, review: item.review) }
        .alert("存储提示", isPresented: Binding(get: { store.storageError != nil }, set: { if !$0 { store.storageError = nil } })) {
            Button("知道了") { store.storageError = nil }
        } message: { Text(store.storageError ?? "") }
    }
    func done(_ module: CourseModule) -> Int { module.units.filter { store.progress.completed[$0.id] != nil }.count }
    func open(_ unit: CourseUnit) { destination = LessonDestination(unit: unit) }
}

struct OverviewView: View {
    let store: LearningStore
    let open: (CourseUnit) -> Void
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 28) {
                Text("把微积分，\n变成看得见的直觉。")
                    .font(.system(.largeTitle, design: .serif).weight(.medium)).lineSpacing(8)
                Text("从一条函数开始，走向变化与累积。\n读一小节，动手试一试，再把理解留下来。")
                    .foregroundStyle(.secondary).lineSpacing(5)
                HStack(spacing: 18) {
                    metric("78", "微课程"); metric("359", "练习题"); metric("13", "交互图形")
                }
                if let unit = store.resumeUnit {
                    Button { open(unit) } label: {
                        HStack { VStack(alignment: .leading, spacing: 8) {
                            Text("接着上次的思路").font(.caption)
                            Text(unit.title).font(.title3.weight(.semibold))
                        }; Spacer(); Image(systemName: "arrow.right") }
                        .padding(24).foregroundStyle(.white).background(Color(red: 0.17, green: 0.30, blue: 0.49), in: RoundedRectangle(cornerRadius: 24))
                    }.buttonStyle(.plain)
                }
                Label("展开屏幕，左边学习，右边推演。", systemImage: "rectangle.split.2x1")
                    .font(.subheadline).foregroundStyle(.secondary)
            }.padding(32).frame(maxWidth: 780, alignment: .leading).frame(maxWidth: .infinity)
        }.background(Theme.background).navigationTitle("今天，从一点开始")
    }
    func metric(_ value: String, _ label: String) -> some View {
        VStack(alignment: .leading, spacing: 6) { Text(value).font(.title2.monospacedDigit().weight(.semibold)); Text(label).font(.caption).foregroundStyle(.secondary) }
            .frame(maxWidth: .infinity, alignment: .leading).padding(18).background(Theme.card, in: RoundedRectangle(cornerRadius: 18))
    }
}

struct ModuleView: View {
    let module: CourseModule
    let store: LearningStore
    let open: (CourseUnit) -> Void
    var body: some View {
        List {
            Section {
                VStack(alignment: .leading, spacing: 14) {
                    Image(systemName: module.symbol).font(.largeTitle).foregroundStyle(Theme.accent)
                    Text(module.subtitle ?? "").font(.title2).fontDesign(.serif)
                    let done = module.units.filter { store.progress.completed[$0.id] != nil }.count
                    ProgressView(value: Double(done), total: Double(module.units.count))
                    Text("已完成 \(done) / \(module.units.count) 节").font(.caption).foregroundStyle(.secondary)
                }.padding(.vertical, 12)
            }
            ForEach(module.lessons) { lesson in
                Section(lesson.title) {
                    ForEach(lesson.units) { unit in
                        Button { open(unit) } label: {
                            HStack(spacing: 14) {
                                Image(systemName: store.progress.completed[unit.id] != nil ? "checkmark.circle.fill" : store.isUnlocked(unit) ? "play.circle" : "eye")
                                    .font(.title3).foregroundStyle(Theme.accent)
                                VStack(alignment: .leading, spacing: 5) {
                                    Text(unit.title).foregroundStyle(.primary)
                                    Text("\(unit.exercises.count) 道练习 · \(store.isUnlocked(unit) ? "约 5 分钟" : "可先预览")")
                                        .font(.caption).foregroundStyle(.secondary)
                                }; Spacer(); Image(systemName: "chevron.right").font(.caption).foregroundStyle(.tertiary)
                            }.padding(.vertical, 7)
                        }.accessibilityIdentifier(unit.id)
                    }
                }
            }
        }.navigationTitle(module.shortTitle)
    }
}

struct ProgressScreen: View {
    let store: LearningStore
    var body: some View {
        List {
            Section("每一步都算数") {
                LabeledContent("完成课程", value: "\(store.completedCount) / \(store.units.count)")
                LabeledContent("满分课程", value: "\(store.masteredCount)")
                LabeledContent("连续学习", value: "\(store.streak) 天")
                LabeledContent("累计学习", value: "\(store.progress.studyDays.count) 天")
                LabeledContent("待巩固错题", value: "\(store.progress.mistakes.count)")
            }
            Section("模块进度") {
                ForEach(store.modules) { m in
                    VStack(alignment: .leading, spacing: 10) {
                        let done = m.units.filter { store.progress.completed[$0.id] != nil }.count
                        HStack { Text(m.shortTitle); Spacer(); Text("\(done)/\(m.units.count)").foregroundStyle(.secondary).monospacedDigit() }
                        ProgressView(value: Double(done), total: Double(m.units.count)).accessibilityLabel(m.shortTitle)
                    }.padding(.vertical, 8)
                }
            }
            Section { Text("完成表示做完本节练习；满分表示在一次完整练习中全部答对。复习只更新错题本，不改变整节最高分。") .font(.footnote).foregroundStyle(.secondary) }
        }.navigationTitle("学习足迹")
    }
}

struct SettingsScreen: View {
    let store: LearningStore
    @State private var reset = false
    var body: some View {
        List {
            Section("微/积 · 细微处，积跬步") {
                LabeledContent("版本", value: "1.0.0")
                LabeledContent("开发者", value: "Zhu Hong")
                Link("访问官网", destination: URL(string: "https://zhuhong.me/weiji/")!)
                Link("联系支持 · zivzhu@gmail.com", destination: URL(string: "mailto:zivzhu@gmail.com?subject=Weiji%20Support")!)
            }
            Section("隐私与数据") {
                Link("在线隐私政策", destination: URL(string: "https://zhuhong.me/weiji/privacy.html")!)
                NavigationLink("隐私说明") {
                    ScrollView { Text(Self.privacy).frame(maxWidth: .infinity, alignment: .leading).padding(24).textSelection(.enabled) }.navigationTitle("隐私说明")
                }
                Text("全部课程可离线使用。学习进度、错题与草稿保存在此设备，可能随系统设备备份保存。") .font(.footnote).foregroundStyle(.secondary)
                Button("清空学习记录与草稿", role: .destructive) { reset = true }
            }
            Section("开源致谢") {
                NavigationLink("KaTeX · MIT License") {
                    ScrollView { Text(license).font(.footnote.monospaced()).padding(24).textSelection(.enabled) }.navigationTitle("开源许可")
                }
            }
        }.navigationTitle("设置")
            .confirmationDialog("清空所有学习记录与手写草稿？此操作不可撤销。", isPresented: $reset, titleVisibility: .visible) {
                Button("清空记录", role: .destructive) { store.reset() }
                Button("取消", role: .cancel) { }
            }
    }
    var license: String {
        guard let url = Bundle.main.url(forResource: "KaTeX-LICENSE", withExtension: "txt", subdirectory: "Content"), let text = try? String(contentsOf: url, encoding: .utf8) else { return "KaTeX — MIT License. https://katex.org" }
        return text
    }
    static let privacy = """
微/积隐私说明
更新日期：2026 年 11 月 8 日

开发者：Zhu Hong
联系邮箱：zivzhu@gmail.com
官网：https://zhuhong.me

微/积无需注册。应用不含广告、分析追踪或第三方登录，不向开发者或第三方服务器上传你的学习记录。

课程内容、数学字体与交互图形随应用安装。学习进度、错题、未完成的练习和手写草稿仅保存在设备上的应用目录中。这些文件可能包含在你启用的 Apple 设备备份内，备份由你的系统设置管理。

你可以在设置中清空学习记录与草稿，或删除应用以移除设备上的应用数据。访问官网或发送支持邮件时，将由浏览器或邮件应用处理；你主动发送的邮件及附件仅用于处理咨询。请勿在支持邮件中发送密码等敏感信息。

如未来版本变更数据处理方式，将同步更新本说明。隐私问题请联系上述邮箱。
"""
}
