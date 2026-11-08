# 应用截图与版本

全部为实际应用截图，没有合成界面或拉伸。

## Build 2 真机验证

- `duo-device-02-interactive-lesson.jpg`：最新练习、两列短选项，以及仅位于题目面板底部的 44 pt 继续按钮。
- `duo-device-03-handwriting-workspace.jpg`：折叠屏的草稿工具。
- `duo-device-notebook-restored.jpg`：绘制、切换工具、旋转和重启后，真实笔迹仍可见。

以上 JPEG 来自 `build/Weiji-layout-final-device.xcresult` 的两项通过测试，不含透明通道。测试使用独立的测试目录。截图时间为真机时间，主要用于验证；普通 iPhone / iPad 商店截图仍在补齐。

## 历史截图

`archive-build1/` 为此前的旧版布局与早期草稿验证，不能用于宣传当前 Build 2。保留这些文件用于对照。

`ios/WeijiUITests/StoreScreenshots.swift` 可重拍首页、练习和草稿三张实际 JPEG。正式上传前应核对所选 App Store 尺寸槽位及截图版本；不能把旧图拉伸成所需尺寸。
