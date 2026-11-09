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
    @Environment(\.dynamicTypeSize) private var dynamicTypeSize
    var module: CourseModule { store.modules.first { $0.id == selectedModule } ?? store.modules[0] }
    var body: some View {
        TabView {
            NavigationStack {
                GeometryReader { geometry in
                    let wide = geometry.size.width >= 600 && !dynamicTypeSize.isAccessibilitySize
                    HStack(spacing: 0) {
                        if wide { moduleRail.frame(width: geometry.size.width < 800 ? 156 : 184) }
                        VStack(spacing: 0) {
                            if !wide {
                                ScrollView(.horizontal, showsIndicators: false) {
                                    HStack(spacing: 8) {
                                        ForEach(store.modules) { item in
                                            Button { selectedModule = item.id } label: {
                                                Text(item.shortTitle).font(.subheadline.weight(.medium)).padding(.horizontal, 13).padding(.vertical, 10)
                                                    .foregroundStyle(item.id == module.id ? Color.white : Color.primary)
                                                    .background(item.id == module.id ? Theme.accent : Theme.card, in: Capsule())
                                            }.buttonStyle(.plain)
                                        }
                                    }.padding(.horizontal, 16)
                                }.padding(.vertical, 8)
                            }
                            ModuleView(module: module, store: store,
                                       availableWidth: geometry.size.width - (wide ? (geometry.size.width < 800 ? 156 : 184) : 0), open: open)
                        }
                    }.background(Theme.background)
                }.toolbar(.hidden, for: .navigationBar)
            }.tabItem { Label("学习", systemImage: "book.closed") }
            NavigationStack {
                List {
                    if store.progress.mistakes.isEmpty {
                        ContentUnavailableView("暂无错题", systemImage: "checkmark.seal", description: Text("答错的题会自动收录，重做答对后移出。"))
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
                .tabItem { Label("进度", systemImage: "chart.bar.xaxis") }
            NavigationStack { SettingsScreen(store: store) }
                .tabItem { Label("设置", systemImage: "gearshape") }
        }
        .onAppear {
            if selectedModule == nil, let resume = store.resumeUnit {
                selectedModule = store.modules.first { $0.units.contains { $0.id == resume.id } }?.id
            }
        }
        .fullScreenCover(item: $destination) { item in LessonScreen(unit: item.unit, store: store, review: item.review) }
        .alert("存储提示", isPresented: Binding(get: { store.storageError != nil }, set: { if !$0 { store.storageError = nil } })) {
            Button("知道了") { store.storageError = nil }
        } message: { Text(store.storageError ?? "") }
    }
    var moduleRail: some View {
        VStack(alignment: .leading, spacing: 18) {
            Text("学习路线").font(.caption.weight(.semibold)).foregroundStyle(.secondary)
            VStack(spacing: 6) {
                ForEach(Array(store.modules.enumerated()), id: \.element.id) { index, item in
                    Button { selectedModule = item.id } label: {
                        HStack(alignment: .top, spacing: 9) {
                            Text(String(format: "%02d", index + 1)).font(.caption.monospacedDigit()).foregroundStyle(.secondary).padding(.top, 2)
                            VStack(alignment: .leading, spacing: 5) {
                                Text(item.shortTitle).font(.subheadline.weight(.semibold))
                                Text("\(done(item)) / \(item.units.count) 节").font(.caption2).foregroundStyle(.secondary)
                                ProgressView(value: Double(done(item)), total: Double(item.units.count))
                            }
                        }.frame(maxWidth: .infinity, alignment: .leading).padding(10)
                            .background(item.id == module.id ? Theme.accent.opacity(0.1) : .clear, in: RoundedRectangle(cornerRadius: 12))
                    }.buttonStyle(.plain)
                }
            }
            Spacer(minLength: 8)
            VStack(alignment: .leading, spacing: 6) {
                Label("离线可用", systemImage: "checkmark.circle").font(.caption)
                Text("78 节课程 · 359 道练习").font(.caption2).foregroundStyle(.secondary)
            }
        }.padding(14).frame(maxHeight: .infinity).background(Theme.card)
    }
    func done(_ module: CourseModule) -> Int { module.units.filter { store.progress.completed[$0.id] != nil }.count }
    func open(_ unit: CourseUnit) { destination = LessonDestination(unit: unit) }
}

struct ModuleView: View {
    let module: CourseModule
    let store: LearningStore
    let availableWidth: CGFloat
    let open: (CourseUnit) -> Void
    @Environment(\.dynamicTypeSize) private var dynamicTypeSize
    var completed: Int { module.units.filter { store.progress.completed[$0.id] != nil }.count }
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                HStack(alignment: .top) {
                    Text(module.shortTitle).font(.title2.weight(.semibold))
                    Spacer(minLength: 8)
                    Text("\(completed) / \(module.units.count)").font(.caption.monospacedDigit().weight(.semibold))
                        .padding(.horizontal, 10).padding(.vertical, 7).background(Theme.card, in: Capsule())
                }
                if let unit = store.resumeUnit {
                    Button { open(unit) } label: {
                        HStack(spacing: 12) {
                            Image(systemName: "play.fill").font(.headline)
                            VStack(alignment: .leading, spacing: 4) {
                                Text("继续学习").font(.caption).opacity(0.8)
                                Text(unit.title).font(.headline)
                            }
                            Spacer(); Image(systemName: "arrow.right")
                        }.padding(15).foregroundStyle(.white)
                            .background(Color(red: 0.17, green: 0.30, blue: 0.49), in: RoundedRectangle(cornerRadius: 16))
                    }.buttonStyle(.plain).accessibilityIdentifier("resumeLesson")
                }
                HStack(spacing: 16) {
                    Label("\(store.completedCount) 节已完成", systemImage: "checkmark.circle")
                    Label("\(store.progress.mistakes.count) 道待巩固", systemImage: "arrow.counterclockwise")
                    Spacer(minLength: 0)
                }.font(.caption).foregroundStyle(.secondary)
                LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 18, alignment: .top), count: availableWidth >= 940 && !dynamicTypeSize.isAccessibilitySize ? 2 : 1), alignment: .leading, spacing: 18) {
                    ForEach(module.lessons) { lesson in
                        lessonGroup(lesson)
                    }
                }
            }.padding(18)
        }.id(module.id).background(Theme.background)
    }
    func lessonGroup(_ lesson: CourseLesson) -> some View {
        VStack(alignment: .leading, spacing: 9) {
                        Text(lesson.title).font(.subheadline.weight(.semibold))
                        LazyVGrid(columns: [GridItem(.adaptive(minimum: dynamicTypeSize.isAccessibilitySize ? 300 : 178), spacing: 10)], spacing: 10) {
                            ForEach(lesson.units) { unit in
                                let finished = store.progress.completed[unit.id] != nil
                                let unlocked = store.isUnlocked(unit)
                                Button { open(unit) } label: {
                                    HStack(alignment: .top, spacing: 10) {
                                        Image(systemName: finished ? "checkmark.circle.fill" : unlocked ? "play.circle" : "lock")
                                            .font(.title3).foregroundStyle(finished || unlocked ? Theme.accent : .secondary)
                                        VStack(alignment: .leading, spacing: 7) {
                                            Text(unit.title).font(.subheadline.weight(.medium)).foregroundStyle(.primary).multilineTextAlignment(.leading)
                                            Text("\(unit.exercises.count) 道练习 · \(finished ? "已完成" : unlocked ? "约 5 分钟" : "预览")")
                                                .font(.caption2).foregroundStyle(.secondary)
                                        }
                                        Spacer(minLength: 0)
                                    }.padding(12).frame(maxWidth: .infinity, minHeight: 76, alignment: .topLeading)
                                        .background(Theme.card, in: RoundedRectangle(cornerRadius: 14))
                                }.buttonStyle(.plain).accessibilityIdentifier(unit.id)
                            }
                        }
        }.frame(maxHeight: .infinity, alignment: .top)
    }
}

struct ProgressScreen: View {
    let store: LearningStore
    var body: some View {
        List {
            Section("学习统计") {
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
        }.navigationTitle("学习进度")
    }
}

struct SettingsScreen: View {
    let store: LearningStore
    @State private var reset = false
    var version: String {
        let version = Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String ?? "1.0.0"
        let build = Bundle.main.object(forInfoDictionaryKey: "CFBundleVersion") as? String ?? "4"
        return "\(version) (\(build))"
    }
    var body: some View {
        List {
            Section("应用信息") {
                LabeledContent("版本", value: version)
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
隐私说明
更新日期：2026 年 11 月 8 日

开发者：Zhu Hong
联系邮箱：zivzhu@gmail.com
官网：https://zhuhong.me

应用无需注册，不含广告、分析追踪或第三方登录，不向开发者或第三方服务器上传你的学习记录。

课程内容、数学字体与交互图形随应用安装。学习进度、错题、未完成的练习和手写草稿仅保存在设备上的应用目录中。这些文件可能包含在你启用的 Apple 设备备份内，备份由你的系统设置管理。

你可以在设置中清空学习记录与草稿，或删除应用以移除设备上的应用数据。访问官网或发送支持邮件时，将由浏览器或邮件应用处理；你主动发送的邮件及附件仅用于处理咨询。请勿在支持邮件中发送密码等敏感信息。

如未来版本变更数据处理方式，将同步更新本说明。隐私问题请联系上述邮箱。
"""
}
