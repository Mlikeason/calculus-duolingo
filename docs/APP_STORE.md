# App Store 1.0 发布资料

本文件不包含审核联系电话、密码、验证码或密钥。

## 当前发布状态（2026-11-08）

- 最终签名归档：`build/Weiji-final.xcarchive`；App Store 分发包：`build/export/Weiji.ipa`，导出成功。
- 官网、支持和隐私页面已发布到当前 `finding-m` 项目，生产部署 `dpl_JE21BeYjinWf1q9x8N3xAZ3waeNe`；三个页面和原首页 HTTP 200。裸域名正常跳转至 `www.zhuhong.me`。
- 网站源码副本在 `release/website/weiji/`，已同步到 `/Users/hoo/zhuhong-journal/weiji/` 并加入部署白名单。旧 `zhuhong-me` GitHub 仓库中的页面也已保存，但当前主域名由 `finding-m` 提供服务。
- Xcode 上传尝试返回：App Store Connect 中不存在 Bundle ID `me.zhuhong.weiji` 的 App 记录。**应用尚未上传成功、尚未提交审核、尚未上架**；需要先在正确团队创建记录。浏览器登录验证仍待完成。
- 最新 Swift 单元测试 5 项全部通过；完整答题恢复与错题流程的 XCUITest 已通过。

## 基本信息

| 字段 | 内容 |
| --- | --- |
| 名称 | 微/积 - 直觉学微积分 |
| 副标题 | 交互图形、每日微课与手写推演 |
| Bundle ID | me.zhuhong.weiji |
| SKU | weiji-ios-001 |
| 版本 / Build | 1.0.0 / 1 |
| 主语言 | 简体中文 |
| 主分类 | 教育 |
| 版权 | 2026 Zhu Hong |
| 支持邮箱 | zivzhu@gmail.com |
| 支持 URL | https://zhuhong.me/weiji/support.html |
| 隐私 URL | https://zhuhong.me/weiji/privacy.html |
| 营销 URL | https://zhuhong.me/weiji/ |

开发者展示名和销售方名称以 Apple 账户核准的法律名称为准；应用内署名使用用户指定的 Zhu Hong。

## 宣传文本

从一个滑块、一条曲线、一道短题开始，让微积分变成看得见的直觉。展开屏幕，边看图形边手写推演；合上以后，也能继续刚才的思路。

## 描述

微/积，用短课程、交互图形与即时解释，陪你一步步理解变化与累积。

从函数和极限出发，走进导数、积分与微分方程。5 个模块、78 节微课、359 道练习，让每次学习都能从一个具体问题开始。

• 看得见的数学：拖动图形参数，观察输入、曲线、斜率与面积怎样变化。
• 有反馈的练习：选择、判断与填空题，答题后查看解释；答错的题自动进入错题本。
• 随手推演：使用原生手写草稿记录思路，支持手指，以及兼容 iPad 上的 Apple Pencil。
• 为大屏和展开屏幕设计：在足够宽的学习空间中并排查看题目与参考图形或草稿，较窄时通过工具切换继续。
• 接着上次学：保存未完成课程、答案、图形参数与草稿。
• 离线且专注：课程随应用安装，无需注册，无广告或行为追踪。

每个人都有自己的理解速度。每天一点，把抽象的符号变成自己的直觉。

学习数据保存在本机，当前版本不支持跨设备同步。需 iOS / iPadOS 17 或更新版本。

## 关键词

微积分,数学,高数,函数,极限,导数,积分,微分方程,学习,练习,错题,图形,手写,离线

## 审核备注

No sign-in or demo account is required. All lessons, fonts and interactive graphics are bundled and work offline. Learning progress and PencilKit notes are stored locally. The app does not collect data, show advertisements, or include third-party analytics.

To test: open 学习 (Learn), tap 继续学习 (Continue), then 开始练习 (Start exercises). Submit an answer and tap 继续 (Continue). Incorrect answers appear in 复习 (Review). Locked lessons can be previewed; completing the preceding lesson unlocks their exercises.

On a regular-width window, including the unfolded iPhone Duo, the lesson and reference / handwriting workspace appear side by side. Compact windows use a segmented tool switcher. Accessibility text sizes prioritize a single readable column.

The local WKWebView renders bundled mathematics and diagrams; navigation, scoring, persistence, review and handwriting are native. It does not download executable app content.

## 商店问卷依据

- App Privacy：当前代码不向开发者收集数据、无追踪；应在 App Store Connect 选择不收集数据，核对最终构建一致。
- 内容：数学教育；无用户生成内容、聊天、赌博、暴力、医疗建议、广告或内购。年龄评级以实际填写 Apple 当前问卷后的结果为准。
- 加密：应用使用系统提供的功能，不实现非豁免加密；Info.plist 已设置 `ITSAppUsesNonExemptEncryption = NO`。
- 价格与地区：尚未在商店确认，不要把准备中的资料描述为已发布。

## 提交顺序

1. 在正确开发者团队下创建 iOS App 记录，匹配 Bundle ID。
2. 上传 `build/export/Weiji.ipa`，等待 Apple 处理完成。
3. 填写本页元数据、审核联系资料、隐私问卷、年龄评级、价格和销售范围。
4. 使用实际应用画面提交当前商店要求的 iPhone / iPad 截图，不拉伸其他尺寸的截图。
5. 选中处理后的构建并提交审核；以 App Store Connect 的状态作为最终结果。
