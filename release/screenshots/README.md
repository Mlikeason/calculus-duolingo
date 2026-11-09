# 应用截图与版本

全部为实际应用截图，没有合成界面、拉伸或尺寸转换。

## 当前 Build 4 商店素材（2026-11-09）

`current/` 下六张 JPEG 已逐张目视检查，并上传到 App Store Connect 1.0.0 的对应尺寸槽位：

| 设备 | 文件 | 尺寸 |
| --- | --- | --- |
| iPhone 中等显示屏 | `iphone-medium-01-learning-route.jpg`、`iphone-medium-02-interactive-lesson.jpg` | 1206 × 2622 |
| iPad 13 英寸 | `ipad-01-learning-route.jpg`、`ipad-02-interactive-lesson.jpg` | 2752 × 2064 |
| iPhone Duo 展开内屏 | `duo-01-learning-route.jpg`、`duo-02-interactive-workspace.jpg` | 2853 × 2007 |

这些图片来自当前 Build 4 源码的专用模拟器，使用 Device Hub 操作和 `simctl io screenshot --type=jpeg` 直接取屏。Duo 使用 `--display=3` 获取内屏。测试数据位于隔离目录，未改动用户的日常学习记录。

已经检查新版无应用内品牌和口号、课程内容完整、数学公式与 WebView 图形可见、图片方向和尺寸正确。Duo 练习图展示正确答案反馈、黑色手写笔迹，以及只位于左侧题目栏底部的继续按钮。

`current/iphone-01-learning-route.png` 为此前通过检查的 Build 3 / 4 同界面首页，1320 × 2868，未用于本次上传。

## 先前截图流程的限制

`build/Store-build3-iPhone.xcresult` 的 7 项单元测试与截图流程通过，但自动整屏 PNG 中的练习 WebView 为空；这些练习图片没有上传。iPad 同轮测试在测试器连接阶段被终止，也未采用。此前自动横屏 JPEG 曾出现方向 / 裁切异常。本次改用直接取屏并逐张检查，六张图片均完整。

## 历史截图

本目录根部的 iPhone、iPad 和 Duo 图片来自 Build 2，含已移除的品牌或文案，不用于当前版本商店页面。`archive-build1/` 是更早布局。保留这些图片用于审查对照。
