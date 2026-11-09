# App Store 1.0 发布资料

本文件不包含审核联系电话、密码、验证码或密钥。

## 当前发布状态（2026-11-09）

- 当前源码为 1.0.0 (4)。`build/Weiji-build4.xcarchive` 已签名归档并上传成功。Build 4 包含精简文案、移除应用内品牌，以及用户要求保留的 Mac / Vision Pro 兼容运行选项。
- 官网、支持和隐私页面已发布到当前 `finding-m` 项目，生产部署 `dpl_JE21BeYjinWf1q9x8N3xAZ3waeNe`；三个页面和原首页 HTTP 200。裸域名正常跳转至 `www.zhuhong.me`。
- 网站源码副本在 `release/website/weiji/`，已同步到 `/Users/hoo/zhuhong-journal/weiji/` 并加入部署白名单。旧 `zhuhong-me` GitHub 仓库中的页面也已保存，但当前主域名由 `finding-m` 提供服务。
- App Store Connect 记录已创建：`6832293808`，Bundle ID `me.zhuhong.weiji`。Build 3、4 均已上传成功。**尚未提交审核、尚未上架**；版本页暂关联 Build 3，待替换最终 Build 4 并补齐截图。
- Build 4 已签名安装到 iPhone Duo，安装查询确认为 1.0.0 (4)。最新 Swift 单元测试 7 项、Node 测试 5 项通过。此前真机手写可见性 / 重启恢复，以及完整答题与错题流程均通过。
- 商店说明、审核联系方式、版权授权、4+ 年龄分级和“不收集数据”隐私标签已保存。联系方式仅填在 Apple 表单，未写入源码。
- Build 2 截图已过时；当前版 iPhone 截图流程通过，但其中练习 PNG 的 WebView 为空，不能上传。iPad 测试器在建立连接前被系统终止。继续补拍实际完整画面，详见 `release/screenshots/README.md`。

## 基本信息

| 字段 | 内容 |
| --- | --- |
| 名称 | 微/积 - 微积分学习 |
| 副标题 | 交互图形、课程练习与手写草稿 |
| Bundle ID | me.zhuhong.weiji |
| SKU | weiji-ios-001 |
| 版本 / Build | 1.0.0 / 4 |
| Apple ID | 6832293808 |
| 主语言 | 简体中文 |
| 主分类 | 教育 |
| 版权 | 2026 Zhu Hong |
| 支持邮箱 | zivzhu@gmail.com |
| 支持 URL | https://zhuhong.me/weiji/support.html |
| 隐私 URL | https://zhuhong.me/weiji/privacy.html |
| 营销 URL | https://zhuhong.me/weiji/ |

开发者展示名和销售方名称以 Apple 账户核准的法律名称为准；应用内署名使用用户指定的 Zhu Hong。

## 宣传文本

78 节微积分课程、359 道练习，配合交互图形、错题复习与手写草稿。支持离线学习，大屏可同时显示题目、图形和草稿。

## 描述

通过课程、交互图形和练习学习微积分。

内容涵盖函数、极限、导数、积分和微分方程，共 5 个模块、78 节课程、359 道练习。

• 看得见的数学：拖动图形参数，观察输入、曲线、斜率与面积怎样变化。
• 有反馈的练习：选择、判断与填空题，答题后查看解释；答错的题自动进入错题本。
• 随手推演：使用原生手写草稿记录思路，支持手指，以及兼容 iPad 上的 Apple Pencil。
• 为大屏和展开屏幕设计：宽屏同时查看题目、参考图形和草稿，继续按钮只位于题目下方；较窄时通过工具切换继续。
• 接着上次学：保存未完成课程、答案、图形参数与草稿。
• 离线且专注：课程随应用安装，无需注册，无广告或行为追踪。

学习数据保存在本机，当前版本不支持跨设备同步。需 iOS / iPadOS 17 或更新版本。

## 关键词

微积分,数学,高数,函数,极限,导数,积分,微分方程,学习,练习,错题,图形,手写,离线

## 审核备注

No sign-in or demo account is required. All lessons, fonts and interactive graphics are bundled and work offline. Learning progress and PencilKit notes are stored locally. The app does not collect data, show advertisements, or include third-party analytics.

To test: open 学习 (Learn), tap 继续学习 (Continue), then 开始练习 (Start exercises). Submit an answer and tap 继续 (Continue). Incorrect answers appear in 复习 (Review). Locked lessons can be previewed; completing the preceding lesson unlocks their exercises.

On a regular-width window, including the unfolded iPhone Duo, the lesson, reference and handwriting workspace use the available area. Wide windows show three columns; narrower expanded windows place notes below the two study panes. Continue stays inside the lesson pane. Compact windows use a segmented tool switcher. Accessibility text sizes prioritize a single readable column.

The local WKWebView renders bundled mathematics and diagrams; navigation, scoring, persistence, review and handwriting are native. It does not download executable app content.

## 商店问卷依据

- App Privacy：当前代码不向开发者收集数据、无追踪；应在 App Store Connect 选择不收集数据，核对最终构建一致。
- 内容：数学教育；无用户生成内容、聊天、赌博、暴力、医疗建议、广告或内购。年龄评级以实际填写 Apple 当前问卷后的结果为准。
- 加密：应用使用系统提供的功能，不实现非豁免加密；Info.plist 已设置 `ITSAppUsesNonExemptEncryption = NO`。
- 价格与地区：免费，175 个地区供应。保留 Apple 芯片 Mac 和 Apple Vision Pro 兼容可用性；当地供应仍受 Apple 的区域要求约束。

## 提交顺序

1. 补拍并上传精简文案后的实际 iPhone / iPad / Duo 截图，不拉伸其他尺寸的截图。
2. 选中处理后的 Build 4，并核对版本页的构建编号。
3. 提交审核；以 App Store Connect 的状态作为最终结果。已获得用户提交授权，无需重复询问。
