# 微/积

用直觉、交互图形和短练习学习微积分。包含原始 Vite 网页版，以及 SwiftUI iOS / iPadOS 应用。

开发者：Zhu Hong · [官网](https://zhuhong.me/weiji/) · [支持](https://zhuhong.me/weiji/support.html) · [隐私政策](https://zhuhong.me/weiji/privacy.html)

当前为 1.0.0 (4)，已安装到真机，并于 2026-11-09 提交 App Store 审核，状态为“等待审核”。商店记录为 `6832293808`。审核通过后自动免费发布。验证与提交状态见 [Review 与验证记录](docs/REVIEW.md)。

## 内容与体验

- 5 个模块、78 节课程、359 道练习、13 类交互图形。
- 原生课程导航、错题复习、学习进度、PencilKit 手写草稿。
- 桌面图标使用用户提供的 `newicon.png`，等比适配为不透明 1024 px 图标。应用内不显示 Logo、应用名称或宣传口号。
- 保留 Apple 芯片 Mac 与 Apple Vision Pro 的 iOS / iPadOS 兼容运行选项；不是独立的 macOS 或 visionOS 原生版本。
- 展开首页使用模块侧栏和课程网格；学习工作区在宽屏并排显示题目、参考和草稿，较窄的展开屏在上方并排显示题目与参考、下方整幅草稿。“继续”仅占题目栏底部。折叠后使用工具切换；辅助字体优先单栏。
- 课程、字体与脚本全部内置。无需账户，无广告、分析 SDK 或云同步；进度原子写入本机文件。
- 保存题目顺序、答案、未提交输入、图形参数和草稿，支持中断恢复。

## 开发

Node.js 22.13+，使用提交的 `package-lock.json`：

```sh
npm ci
npm test
npm run dev
npm run build
```

## iOS

最低 iOS / iPadOS 17。已使用 Xcode 27.2、iOS 27.2 SDK 编译和测试。针对 iPhone Duo 的完整系统布局，使用 Xcode 27.1 或更新版本。

```sh
npm run ios:resources
npm run ios:project
open ios/Weiji.xcodeproj
```

在 Xcode 选择 `Weiji` scheme，设置自己的 Signing Team 后运行。Bundle ID 为 `me.zhuhong.weiji`。修改 `data/`、`src/viz/`、渲染脚本或样式后，重新执行 `ios:resources`；修改项目生成脚本后，执行 `ios:project`。

```sh
xcodebuild test -project ios/Weiji.xcodeproj -scheme Weiji \
  -destination 'platform=iOS Simulator,name=Weiji QA Duo' \
  -derivedDataPath build/DerivedData CODE_SIGNING_ALLOWED=NO

xcodebuild archive -project ios/Weiji.xcodeproj -scheme Weiji \
  -destination 'generic/platform=iOS' -archivePath build/Weiji.xcarchive \
  DEVELOPMENT_TEAM=KW9NTQUH4T -allowProvisioningUpdates

xcodebuild -exportArchive -archivePath build/Weiji.xcarchive \
  -exportPath build/export -exportOptionsPlist ios/Config/ExportOptions.plist \
  -allowProvisioningUpdates
```

Team ID 是公开的签名标识；证书、私钥、登录凭据与审核联系人电话不得提交到仓库。`build/` 和签名私有配置已忽略。

## 架构

`LearningStore` 管理原生学习状态与判题，`LessonScreen` 管理自适应工作区，`NotebookView` 使用 PencilKit。`LessonWebView` 仅负责展示应用包中的数学排版和图形；不加载远程应用代码。网页端和 iOS 共用题库与图形实现，iOS 的评分在 Swift 中进行。

生成的 `ios/Weiji/Content` 随仓库提交，使 Xcode 打开即可构建；资源生成脚本会清理并重建此目录。WebKit 使用非持久化数据存储并阻止外部导航。CSP 中 `unsafe-eval` 仅供内置图形引擎的固定数学表达式使用，不能接收远程脚本或用户表达式。

详见 [Review 与验证记录](docs/REVIEW.md) 和 [App Store 发布资料](docs/APP_STORE.md)。
