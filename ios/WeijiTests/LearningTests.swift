import XCTest
import PencilKit
@testable import Weiji

final class LearningTests: XCTestCase {
    @MainActor func testNotebookPersistsWithoutDependingOnCanvasLifetime() throws {
        let directory = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
        defer { try? FileManager.default.removeItem(at: directory) }
        let notebook = Notebook(unitID: "test", directory: directory)
        let points = [CGPoint(x: 20, y: 20), CGPoint(x: 100, y: 80)].enumerated().map {
            PKStrokePoint(location: $0.element, timeOffset: Double($0.offset), size: CGSize(width: 3, height: 3), opacity: 1, force: 1, azimuth: 0, altitude: .pi / 2)
        }
        let stroke = PKStroke(ink: PKInk(.pen, color: .black), path: PKStrokePath(controlPoints: points, creationDate: Date()))
        notebook.changed(PKDrawing(strokes: [stroke]))
        notebook.save()
        XCTAssertNil(notebook.error)
        let restored = Notebook(unitID: "test", directory: directory)
        XCTAssertEqual(restored.drawing.strokes.count, 1)
        XCTAssertEqual(restored.drawing.bounds, notebook.drawing.bounds)
        XCTAssertNil(restored.canvas, "Drawing survives without retaining a rendering surface")
        restored.clear()
        XCTAssertTrue(Notebook(unitID: "test", directory: directory).drawing.strokes.isEmpty)
    }
    func testFullNumericParsing() {
        for (input, answer) in [("1/2", "1/6"), ("1", "1/x"), ("3x", "3"), ("8abc", "8"), ("", "0"), ("1/0", "1")] {
            XCTAssertFalse(AnswerMatcher.matches(input, answers: [answer]))
        }
        XCTAssertTrue(AnswerMatcher.matches("2/12", answers: ["1/6"]))
        XCTAssertTrue(AnswerMatcher.matches("－３", answers: ["-3"]))
        XCTAssertTrue(AnswerMatcher.matches("π / 2", answers: ["pi/2"]))
    }
    @MainActor func testSessionPersistsAndCannotAwardTwice() throws {
        let modules = try Curriculum.load()
        let directory = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
        defer { try? FileManager.default.removeItem(at: directory) }
        let store = LearningStore(modules: modules, directory: directory)
        let unit = modules[0].units[0]
        XCTAssertFalse(store.isUnlocked(modules[0].units[1]))
        store.start(unit)
        let order = store.session(for: unit)?.optionOrders
        store.advance(unit)
        XCTAssertEqual(store.answer(unitID: unit.id, index: 0, choice: 0), false)
        XCTAssertNil(store.answer(unitID: unit.id, index: 0, choice: 2))
        let reloaded = LearningStore(modules: modules, directory: directory)
        XCTAssertEqual(reloaded.session(for: unit)?.optionOrders, order)
        XCTAssertEqual(reloaded.session(for: unit)?.answers[0]?.correct, false)
        reloaded.advance(unit)
        XCTAssertEqual(reloaded.answer(unitID: unit.id, index: 1, choice: 1), true)
        reloaded.advance(unit)
        reloaded.draft("９", unitID: unit.id, index: 2)
        let resumed = LearningStore(modules: modules, directory: directory)
        XCTAssertEqual(resumed.session(for: unit)?.drafts[2], "９")
        resumed.answer(unitID: unit.id, index: 2, text: "9"); resumed.advance(unit)
        resumed.answer(unitID: unit.id, index: 3, choice: 2); resumed.advance(unit)
        resumed.answer(unitID: unit.id, index: 4, text: "4"); resumed.advance(unit)
        XCTAssertEqual(resumed.completedCount, 1)
        XCTAssertTrue(resumed.isUnlocked(modules[0].units[1]))
        XCTAssertEqual(resumed.progress.bestScores[unit.id], 4)
        resumed.start(unit, review: true, restart: true)
        XCTAssertEqual(resumed.session(for: unit)?.queue.count, 1)
        resumed.answer(unitID: unit.id, index: 0, choice: 2); resumed.advance(unit)
        XCTAssertEqual(resumed.session(for: unit)?.correctCount, 1)
        XCTAssertTrue(resumed.progress.mistakes.isEmpty)
        XCTAssertEqual(resumed.progress.bestScores[unit.id], 4, "Review must not overwrite full lesson score")
        let second = modules[0].units[1]
        resumed.start(unit, restart: true)
        let sessionID = resumed.session(for: unit)?.id
        resumed.start(second)
        XCTAssertEqual(resumed.resumeUnit?.id, second.id)
        resumed.start(unit)
        XCTAssertEqual(resumed.resumeUnit?.id, unit.id)
        XCTAssertEqual(resumed.session(for: unit)?.id, sessionID)
    }
    @MainActor func testLockedLessonAndUnansweredQuestionCannotAdvance() throws {
        let modules = try Curriculum.load()
        let directory = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
        defer { try? FileManager.default.removeItem(at: directory) }
        let store = LearningStore(modules: modules, directory: directory)
        store.start(modules[0].units[1])
        XCTAssertNil(store.session(for: modules[0].units[1]))
        let unit = modules[0].units[0]
        store.start(unit); store.advance(unit); store.advance(unit)
        XCTAssertEqual(store.session(for: unit)?.position, 0)
        XCTAssertNil(store.answer(unitID: unit.id, index: 0, choice: 99))
        XCTAssertEqual(store.completedCount, 0)
    }
    @MainActor func testCorruptProgressIsRecoverable() throws {
        let modules = try Curriculum.load()
        let directory = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
        defer { try? FileManager.default.removeItem(at: directory) }
        try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
        try Data("not json".utf8).write(to: directory.appendingPathComponent("progress.json"))
        let store = LearningStore(modules: modules, directory: directory)
        XCTAssertNotNil(store.storageError)
        XCTAssertEqual(store.completedCount, 0)
        XCTAssertTrue(try FileManager.default.contentsOfDirectory(atPath: directory.path).contains { $0.hasPrefix("progress-recovery-") })
    }
    func testBundledCurriculumIsComplete() throws {
        let modules = try Curriculum.load()
        XCTAssertEqual(modules.count, 5)
        XCTAssertEqual(modules.flatMap(\.units).count, 78)
        XCTAssertEqual(modules.flatMap(\.units).flatMap(\.exercises).count, 359)
    }
}
