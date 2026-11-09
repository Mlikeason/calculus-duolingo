# 应用截图与版本

全部为实际应用截图，没有合成界面或拉伸。

## 当前 Build 4 截图状态

Build 3 / 4 移除了应用内品牌、口号和模块副标题；下列 Build 2 图片均已过时，不能用于当前版本商店提交。

`build/Store-build3-iPhone.xcresult` 的 7 项单元测试与截图流程通过，整屏 PNG 已导出到 `build/build3-iphone-attachments/`。首页通过目视检查，但练习页的 WebView 在自动截图中为空，不能作为商店素材。iPad 本轮运行在测试器连接阶段被终止，未生成有效截图。仍需直接取屏并逐张检查。

## Build 2 iPhone 商店截图

`iphone-01-learning-route.jpg`、`iphone-02-interactive-lesson.jpg`、`iphone-03-handwriting-workspace.jpg` 为当前界面，尺寸 1320 × 2868，JPEG、无透明通道。来自通过的 `build/Store-final-iPhone.xcresult`，已经目视检查。

## Build 2 iPad 商店截图

`ipad-01-learning-route.jpg`、`ipad-02-interactive-lesson.jpg` 为 2752 × 2064 横屏 JPEG、无透明通道。通过 Device Hub 操作专用模拟器，使用 `simctl io screenshot --type=jpeg` 直接获取完整屏幕；已检查方向、全部三栏和按钮位置。

自动测试 `build/Store-build2-iPad.xcresult` 通过，但 `app.screenshot().image.jpegData` 导出的横屏图片出现方向 / 裁切异常，因此没有采用。截图辅助函数改为系统整屏 PNG；随后一次运行在测试器准备阶段崩溃，最终素材由上述直接取屏完成。

## Build 2 真机验证

- `duo-device-02-interactive-lesson.jpg`：最新练习、两列短选项，以及仅位于题目面板底部的 44 pt 继续按钮。
- `duo-device-03-handwriting-workspace.jpg`：折叠屏的草稿工具。
- `duo-device-notebook-restored.jpg`：绘制、切换工具、旋转和重启后，真实笔迹仍可见。

以上 JPEG 来自 `build/Weiji-layout-final-device.xcresult` 的两项通过测试，不含透明通道。测试使用独立的测试目录。截图时间为真机时间，主要用于验证；普通 iPhone / iPad 的新版素材均已补齐。

## 历史截图

`archive-build1/` 为此前的旧版布局与早期草稿验证，不能用于宣传当前 Build 2。保留这些文件用于对照。

`ios/WeijiUITests/StoreScreenshots.swift` 可重拍首页、练习和草稿三张整屏 PNG；iPad 横屏也可使用上述 `simctl` 命令直接获取 JPEG。正式上传前应核对所选 App Store 尺寸槽位及截图版本；不能把旧图拉伸成所需尺寸。
