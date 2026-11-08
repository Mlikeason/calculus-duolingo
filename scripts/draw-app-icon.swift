import AppKit
let size = NSSize(width: 1024, height: 1024)
let image = NSImage(size: size)
image.lockFocus()
NSColor(calibratedRed: 0.09, green: 0.17, blue: 0.29, alpha: 1).setFill()
NSRect(origin: .zero, size: size).fill()
let grid = NSBezierPath()
for p in stride(from: 128, through: 896, by: 128) { grid.move(to: NSPoint(x: p, y: 100)); grid.line(to: NSPoint(x: p, y: 924)); grid.move(to: NSPoint(x: 100, y: p)); grid.line(to: NSPoint(x: 924, y: p)) }
NSColor.white.withAlphaComponent(0.07).setStroke(); grid.lineWidth = 2; grid.stroke()
let curve = NSBezierPath()
curve.move(to: NSPoint(x: 235, y: 230)); curve.curve(to: NSPoint(x: 790, y: 790), controlPoint1: NSPoint(x: 630, y: 200), controlPoint2: NSPoint(x: 430, y: 700))
NSColor(calibratedRed: 0.56, green: 0.78, blue: 0.91, alpha: 1).setStroke(); curve.lineWidth = 24; curve.lineCapStyle = .round; curve.stroke()
let attributes: [NSAttributedString.Key: Any] = [.font: NSFont(name: "TimesNewRomanPSMT", size: 560) ?? NSFont.systemFont(ofSize: 560), .foregroundColor: NSColor.white]
("∫" as NSString).draw(at: NSPoint(x: 340, y: 190), withAttributes: attributes)
NSColor(calibratedRed: 0.95, green: 0.75, blue: 0.40, alpha: 1).setFill()
NSBezierPath(ovalIn: NSRect(x: 724, y: 713, width: 72, height: 72)).fill()
image.unlockFocus()
let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: 1024, pixelsHigh: 1024, bitsPerSample: 8, samplesPerPixel: 3, hasAlpha: false, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
NSGraphicsContext.saveGraphicsState(); NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)
image.draw(in: NSRect(origin: .zero, size: size)); NSGraphicsContext.restoreGraphicsState()
try rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: "ios/Weiji/Assets.xcassets/AppIcon.appiconset/AppIcon.png"))
