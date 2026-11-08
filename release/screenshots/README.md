# 实际应用截图

2026-11-08 使用 iOS 27.2 的 iPhone Duo 模拟器获取，无合成界面、无拉伸。

| 文件 | 像素尺寸 | 用途 |
| --- | --- | --- |
| duo-inner-home.jpg | 2853 × 2007 | 展开横屏首页；JPEG，无透明通道 |
| duo-inner-lesson.jpg | 2853 × 2007 | 展开横屏课程与参考图形；JPEG，无透明通道 |
| duo-inner-home.png | 2853 × 2007 | 较早的展开首页布局验证 |
| duo-inner-lesson.png | 2853 × 2007 | 较早的展开课程布局验证 |
| duo-inner-portrait.png | 2007 × 2853 | 展开竖屏双栏布局验证 |
| duo-outer-lesson.png | 1398 × 2034 | 折叠后的课程布局验证 |

PNG 带透明通道，只作为原始验证证据。商店上传优先使用 JPEG；普通 iPhone 与 iPad 截图集尚待补齐。

`ios/WeijiUITests/StoreScreenshots.swift` 提供首页、课程和草稿工具的 JPEG 截图流程。本机两次运行在调试器启动阶段停滞后取消，未声明该截图测试通过。PencilKit 的可见绘制仍有待解决的验证问题，参见 `docs/REVIEW.md`。
