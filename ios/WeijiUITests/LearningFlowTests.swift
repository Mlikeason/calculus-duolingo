import XCTest

final class LearningFlowTests: XCTestCase {
    @MainActor func testLessonResumeAndMistakeReview() {
        let app = XCUIApplication()
        app.launchArguments = ["--ui-testing", "--reset-test-data"]
        app.launch()
        let resume = app.buttons["resumeLesson"]
        XCTAssertTrue(resume.waitForExistence(timeout: 15))
        resume.tap()
        let next = app.buttons["nextStep"]
        XCTAssertTrue(next.waitForExistence(timeout: 15))
        next.tap()
        let wrong = app.webViews.buttons["5"]
        XCTAssertTrue(wrong.waitForExistence(timeout: 15)); wrong.tap()
        XCTAssertTrue(app.webViews.staticTexts["没关系，从这里学会。"].waitForExistence(timeout: 10))
        app.terminate()
        app.launchArguments = ["--ui-testing"]
        app.launch(); app.buttons["resumeLesson"].tap()
        XCTAssertTrue(app.webViews.staticTexts["没关系，从这里学会。"].waitForExistence(timeout: 15))
        next.tap()
        let falseButton = app.webViews.buttons["错"]
        XCTAssertTrue(falseButton.waitForExistence(timeout: 10)); falseButton.tap()
        XCTAssertTrue(app.webViews.staticTexts["答对了，继续积累。"].waitForExistence(timeout: 10))
        next.tap()
        let input = app.webViews.textFields.firstMatch
        XCTAssertTrue(input.waitForExistence(timeout: 10)); input.tap(); input.typeText("9")
        app.webViews.buttons["检查答案"].tap()
        XCTAssertTrue(app.webViews.staticTexts["答对了，继续积累。"].waitForExistence(timeout: 10)); next.tap()
        let fruit = app.webViews.buttons["每个人对应他喜欢的所有水果"]
        XCTAssertTrue(fruit.waitForExistence(timeout: 10)); fruit.tap()
        XCTAssertTrue(app.webViews.staticTexts["答对了，继续积累。"].waitForExistence(timeout: 10)); next.tap()
        XCTAssertTrue(input.waitForExistence(timeout: 10)); input.tap(); input.typeText("4")
        app.webViews.buttons["检查答案"].tap()
        XCTAssertTrue(app.webViews.staticTexts["答对了，继续积累。"].waitForExistence(timeout: 10)); next.tap()
        XCTAssertTrue(app.staticTexts["本次答对 4 / 5 道"].waitForExistence(timeout: 10))
        app.buttons["巩固本节错题"].tap()
        let seven = app.webViews.buttons["7"]
        XCTAssertTrue(seven.waitForExistence(timeout: 10)); seven.tap()
        XCTAssertTrue(app.webViews.staticTexts["答对了，继续积累。"].waitForExistence(timeout: 10)); next.tap()
        XCTAssertTrue(app.staticTexts["本次答对 1 / 1 道"].waitForExistence(timeout: 10))
        let shot = XCTAttachment(screenshot: app.screenshot()); shot.name = "completed-review"; shot.lifetime = .keepAlways; add(shot)
    }
}
