import XCTest
import UIKit

final class StoreScreenshots: XCTestCase {
    @MainActor func testStoreScreenshots() {
        continueAfterFailure = false
        if UIDevice.current.userInterfaceIdiom == .pad { XCUIDevice.shared.orientation = .landscapeLeft }
        let app = XCUIApplication()
        app.launchArguments = ["--ui-testing", "--reset-test-data"]
        app.launch()
        let resume = app.buttons["resumeLesson"]
        XCTAssertTrue(resume.waitForExistence(timeout: 20))
        capture(app, "01-learning-route")
        resume.tap()
        let next = app.buttons["nextStep"]
        XCTAssertTrue(next.waitForExistence(timeout: 20))
        next.tap()
        // Cold simulator WebKit processes can start slowly on a busy build host.
        XCTAssertTrue(app.webViews.buttons["7"].waitForExistence(timeout: 90))
        capture(app, "02-interactive-lesson")
        if !app.buttons["清空本节草稿"].isHittable {
            app.segmentedControls["learningTools"].buttons["草稿"].tap()
        }
        XCTAssertTrue(app.buttons["清空本节草稿"].waitForExistence(timeout: 10))
        capture(app, "03-handwriting-workspace")
    }
    @MainActor private func capture(_ app: XCUIApplication, _ name: String) {
        // Capture the full framebuffer. Cropping an application screenshot and
        // re-encoding UIImage can mismatch landscape bounds / EXIF orientation.
        let attachment = XCTAttachment(data: XCUIScreen.main.screenshot().pngRepresentation, uniformTypeIdentifier: "public.png")
        attachment.name = name
        attachment.lifetime = .keepAlways
        add(attachment)
    }
}
