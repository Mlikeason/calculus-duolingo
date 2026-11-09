import Foundation
import Observation

struct SubmittedAnswer: Codable {
    let correct: Bool
    let text: String
    let choice: Int?
}
struct LessonSession: Codable, Identifiable {
    var id = UUID()
    let unitID: String
    var queue: [Int]
    var position = -1
    var answers: [Int: SubmittedAnswer] = [:]
    var drafts: [Int: String] = [:]
    var optionOrders: [Int: [Int]] = [:]
    var visualValues: [String: String] = [:]
    var isReview = false
    var isFinished: Bool { position >= queue.count }
    var exerciseIndex: Int? { queue.indices.contains(position) ? queue[position] : nil }
    var correctCount: Int { queue.filter { answers[$0]?.correct == true }.count }
}
struct LearningProgress: Codable {
    var version = 1
    var completed: [String: Date] = [:]
    var bestScores: [String: Int] = [:]
    var mistakes: Set<String> = []
    var sessions: [String: LessonSession] = [:]
    var studyDays: Set<String> = []
    var lastUnitID: String?
}

@MainActor @Observable final class LearningStore {
    let modules: [CourseModule]
    private(set) var progress = LearningProgress()
    var storageError: String?
    let directory: URL
    var units: [CourseUnit] { modules.flatMap(\.units) }
    var totalExercises: Int { units.reduce(0) { $0 + $1.exercises.count } }
    var completedCount: Int { units.filter { progress.completed[$0.id] != nil }.count }
    var masteredCount: Int { units.filter { progress.bestScores[$0.id] == $0.exercises.count }.count }
    var nextUnit: CourseUnit? { units.first { progress.completed[$0.id] == nil } }
    var resumeUnit: CourseUnit? {
        if let id = progress.lastUnitID, let s = progress.sessions[id], !s.isFinished { return unit(id) }
        return nextUnit
    }
    init(modules: [CourseModule], directory: URL? = nil) {
        self.modules = modules
        self.directory = directory ?? URL.applicationSupportDirectory.appendingPathComponent("Weiji", isDirectory: true)
        do {
            try FileManager.default.createDirectory(at: self.directory, withIntermediateDirectories: true)
            let url = self.directory.appendingPathComponent("progress.json")
            if FileManager.default.fileExists(atPath: url.path) {
                let saved = try JSONDecoder().decode(LearningProgress.self, from: Data(contentsOf: url))
                guard saved.version == 1 else { throw CocoaError(.coderReadCorrupt) }
                progress = saved
                // Content updates may remove lessons. Never index stale exercise queues.
                progress.sessions = saved.sessions.filter { id, session in
                    guard let unit = modules.flatMap(\.units).first(where: { $0.id == id }) else { return false }
                    return session.unitID == id && !session.queue.isEmpty && Set(session.queue).count == session.queue.count
                        && session.queue.allSatisfy { unit.exercises.indices.contains($0) }
                        && (-1...session.queue.count).contains(session.position)
                }
            }
        } catch {
            // Keep the unreadable file for recovery rather than silently destroying it.
            let source = self.directory.appendingPathComponent("progress.json")
            let backup = self.directory.appendingPathComponent("progress-recovery-\(UUID().uuidString).json")
            if FileManager.default.fileExists(atPath: source.path) { try? FileManager.default.copyItem(at: source, to: backup) }
            storageError = "无法读取学习记录，已尝试保留恢复副本。\(error.localizedDescription)"
        }
    }
    func unit(_ id: String) -> CourseUnit? { units.first { $0.id == id } }
    func isUnlocked(_ unit: CourseUnit) -> Bool {
        guard let i = units.firstIndex(where: { $0.id == unit.id }) else { return false }
        return i == 0 || progress.completed[unit.id] != nil || progress.completed[units[i - 1].id] != nil
    }
    func session(for unit: CourseUnit) -> LessonSession? { progress.sessions[unit.id] }
    func start(_ unit: CourseUnit, review: Bool = false, restart: Bool = false) {
        guard isUnlocked(unit) else { return }
        if !restart, let existing = session(for: unit), !existing.isFinished, existing.isReview == review {
            progress.lastUnitID = unit.id
            save()
            return
        }
        let queue = review ? unit.exercises.indices.filter { progress.mistakes.contains("\(unit.id):\($0)") } : Array(unit.exercises.indices)
        guard !queue.isEmpty else { return }
        var session = LessonSession(unitID: unit.id, queue: queue, isReview: review)
        if review { session.position = 0 }
        for index in queue {
            if let options = unit.exercises[index].options { session.optionOrders[index] = Array(options.indices).shuffled() }
        }
        progress.sessions[unit.id] = session
        progress.lastUnitID = unit.id
        save()
    }
    func draft(_ text: String, unitID: String, index: Int) {
        guard var session = progress.sessions[unitID], session.exerciseIndex == index, session.answers[index] == nil else { return }
        session.drafts[index] = String(text.prefix(300))
        progress.sessions[unitID] = session
        save()
    }
    func setVisual(_ values: [String: String], unitID: String) {
        guard progress.sessions[unitID] != nil else { return }
        progress.sessions[unitID]?.visualValues = values
        save()
    }
    @discardableResult func answer(unitID: String, index: Int, text: String = "", choice: Int? = nil) -> Bool? {
        guard let unit = unit(unitID), var session = progress.sessions[unitID], session.exerciseIndex == index,
              session.answers[index] == nil, unit.exercises.indices.contains(index) else { return nil }
        let exercise = unit.exercises[index]
        if exercise.type == "fill", text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty { return nil }
        if exercise.type != "fill" {
            let count = exercise.type == "truefalse" ? 2 : (exercise.options?.count ?? 0)
            guard let choice, (0..<count).contains(choice) else { return nil }
        }
        let correct = exercise.isCorrect(text: text, choice: choice)
        session.answers[index] = SubmittedAnswer(correct: correct, text: text, choice: choice)
        progress.sessions[unitID] = session
        let key = "\(unitID):\(index)"
        if correct { progress.mistakes.remove(key) } else { progress.mistakes.insert(key) }
        progress.studyDays.insert(Self.dayKey(Date()))
        save()
        return correct
    }
    func advance(_ unit: CourseUnit) {
        guard var session = session(for: unit), !session.isFinished else { return }
        if let index = session.exerciseIndex, session.answers[index] == nil { return }
        session.position += 1
        progress.sessions[unit.id] = session
        if session.isFinished {
            if !session.isReview {
                progress.completed[unit.id] = progress.completed[unit.id] ?? Date()
                progress.bestScores[unit.id] = max(progress.bestScores[unit.id] ?? 0, session.correctCount)
            }
            progress.studyDays.insert(Self.dayKey(Date()))
        }
        save()
    }
    var streak: Int {
        let calendar = Calendar.current
        var day = Date()
        if !progress.studyDays.contains(Self.dayKey(day)) { day = calendar.date(byAdding: .day, value: -1, to: day)! }
        var result = 0
        while progress.studyDays.contains(Self.dayKey(day)) {
            result += 1
            day = calendar.date(byAdding: .day, value: -1, to: day)!
        }
        return result
    }
    static func dayKey(_ date: Date) -> String {
        let c = Calendar.current.dateComponents([.year, .month, .day], from: date)
        return String(format: "%04d-%02d-%02d", c.year!, c.month!, c.day!)
    }
    func save() {
        do { try JSONEncoder().encode(progress).write(to: directory.appendingPathComponent("progress.json"), options: .atomic) }
        catch { storageError = "学习记录未能保存：\(error.localizedDescription)" }
    }
    func reset() {
        do {
            let drawings = directory.appendingPathComponent("Drawings")
            if FileManager.default.fileExists(atPath: drawings.path) { try FileManager.default.removeItem(at: drawings) }
            progress = LearningProgress()
            save()
        } catch { storageError = "无法清空草稿：\(error.localizedDescription)" }
    }
}
