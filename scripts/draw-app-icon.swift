import Foundation
import CoreGraphics
import ImageIO

// Preserve the user's artwork, fitting it to an opaque square without distortion.
let sourceURL = URL(fileURLWithPath: "newicon.png")
guard let source = CGImageSourceCreateWithURL(sourceURL as CFURL, nil),
      let image = CGImageSourceCreateImageAtIndex(source, 0, nil),
      let space = CGColorSpace(name: CGColorSpace.sRGB),
      let context = CGContext(data: nil, width: 1024, height: 1024, bitsPerComponent: 8, bytesPerRow: 1024 * 4, space: space, bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue) else { fatalError("Cannot read icon artwork") }
context.setFillColor(CGColor(gray: 1, alpha: 1))
context.fill(CGRect(x: 0, y: 0, width: 1024, height: 1024))
context.interpolationQuality = .high
let scale = 1024.0 / Double(max(image.width, image.height))
let width = Double(image.width) * scale, height = Double(image.height) * scale
context.draw(image, in: CGRect(x: (1024 - width) / 2, y: (1024 - height) / 2, width: width, height: height))
guard let result = context.makeImage() else { fatalError("Cannot render icon") }
let output = URL(fileURLWithPath: "ios/Weiji/Assets.xcassets/AppIcon.appiconset/AppIcon.png")
guard let destination = CGImageDestinationCreateWithURL(output as CFURL, "public.png" as CFString, 1, nil) else { fatalError("Cannot save icon") }
CGImageDestinationAddImage(destination, result, nil)
guard CGImageDestinationFinalize(destination) else { fatalError("Cannot finalize icon") }
let brand = URL(fileURLWithPath: "ios/Weiji/Assets.xcassets/BrandMark.imageset", isDirectory: true)
try FileManager.default.createDirectory(at: brand, withIntermediateDirectories: true)
try Data(contentsOf: output).write(to: brand.appendingPathComponent("BrandMark.png"))
try Data(#"{"images":[{"filename":"BrandMark.png","idiom":"universal"}],"info":{"author":"xcode","version":1}}"#.utf8).write(to: brand.appendingPathComponent("Contents.json"))
