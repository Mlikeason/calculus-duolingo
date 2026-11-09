import XCTest
import UIKit

final class NotebookFlowTests: XCTestCase {
    @MainActor func testInkStaysVisibleAfterToolSwitchRotationAndRelaunch() {
        continueAfterFailure = false
        let app = XCUIApplication()
        app.launchArguments = ["--ui-testing", "--reset-test-data"]
        app.launch()
        XCTAssertTrue(app.buttons["resumeLesson"].waitForExistence(timeout: 30))
        app.buttons["resumeLesson"].tap()
        openNotebook(app)
        let canvas = app.descendants(matching: .any).matching(identifier: "notebookCanvas").firstMatch
        XCTAssertTrue(canvas.waitForExistence(timeout: 15))
        let emptyPixels = darkPixelCount(canvas.screenshot().image)
        print("Notebook viewport: \(canvas.frame), baseline contrasting pixels: \(emptyPixels)")
        canvas.coordinate(withNormalizedOffset: CGVector(dx: 0.2, dy: 0.25))
            .press(forDuration: 0.15, thenDragTo: canvas.coordinate(withNormalizedOffset: CGVector(dx: 0.65, dy: 0.6)))
        capture(app, "notebook-after-drag")
        print("Contrasting pixels after drag: \(darkPixelCount(canvas.screenshot().image))")
        assertInk(canvas, above: emptyPixels)
        capture(app, "notebook-drawn")
        if app.buttons["布局"].exists {
            app.buttons["布局"].tap(); app.buttons["只看图形"].tap()
        } else { app.segmentedControls["learningTools"].buttons["参考"].tap() }
        openNotebook(app)
        assertInk(canvas, above: emptyPixels)
        XCUIDevice.shared.orientation = .landscapeLeft
        openNotebook(app)
        assertInk(canvas, above: emptyPixels)
        XCUIDevice.shared.orientation = .portrait
        openNotebook(app)
        assertInk(canvas, above: emptyPixels)
        app.terminate()
        app.launchArguments = ["--ui-testing"]
        app.launch()
        XCTAssertTrue(app.buttons["resumeLesson"].waitForExistence(timeout: 30))
        app.buttons["resumeLesson"].tap()
        openNotebook(app)
        assertInk(canvas, above: emptyPixels)
        capture(app, "notebook-restored")
    }
    @MainActor private func openNotebook(_ app: XCUIApplication) {
        XCTAssertTrue(app.buttons["closeLesson"].waitForExistence(timeout: 30))
        if app.buttons["清空本节草稿"].isHittable { return }
        if app.buttons["布局"].exists {
            app.buttons["布局"].tap(); app.buttons["只看草稿"].tap()
        }
        else { app.segmentedControls["learningTools"].buttons["草稿"].tap() }
    }
    @MainActor private func assertInk(_ canvas: XCUIElement, above baseline: Int) {
        let visible = XCTNSPredicateExpectation(predicate: NSPredicate { _, _ in
            canvas.exists && self.darkPixelCount(canvas.screenshot().image) > baseline + 40
        }, object: nil)
        XCTAssertEqual(XCTWaiter.wait(for: [visible], timeout: 20), .completed, "Saved ink must remain visibly rendered")
    }
    private func darkPixelCount(_ image: UIImage) -> Int {
        guard let cgImage = image.cgImage else { return 0 }
        let width = cgImage.width, height = cgImage.height
        var pixels = [UInt8](repeating: 0, count: width * height * 4)
        let count = pixels.withUnsafeMutableBytes { buffer -> Int in
            guard let context = CGContext(data: buffer.baseAddress, width: width, height: height, bitsPerComponent: 8, bytesPerRow: width * 4, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { return 0 }
            context.draw(cgImage, in: CGRect(x: 0, y: 0, width: width, height: height))
            let bytes = buffer.bindMemory(to: UInt8.self)
            let background = Int(bytes[0]) + Int(bytes[1]) + Int(bytes[2])
            return stride(from: 0, to: bytes.count, by: 4).reduce(0) { total, index in
                let brightness = Int(bytes[index]) + Int(bytes[index + 1]) + Int(bytes[index + 2])
                return total + ((abs(brightness - background) > 300 && bytes[index + 3] > 200) ? 1 : 0)
            }
        }
        return count
    }
    @MainActor private func capture(_ app: XCUIApplication, _ name: String) {
        let attachment = XCTAttachment(data: app.screenshot().image.jpegData(compressionQuality: 0.98)!, uniformTypeIdentifier: "public.jpeg")
        attachment.name = name; attachment.lifetime = .keepAlways; add(attachment)
    }
}
