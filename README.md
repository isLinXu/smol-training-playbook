# Smol Training Playbook - 训练手册

这是一个从 Hugging Face Space 拉取的训练手册项目，支持本地 HTML 文件访问和 GitHub Pages 部署。

## 🚀 快速开始

### 方式一：本地 HTML 文件访问

如果您想直接在浏览器中打开 HTML 文件（无需服务器），请使用以下步骤：

#### 1. 安装依赖
```bash
cd app
npm install
```

#### 2. 构建本地版本
```bash
npm run build:local
```

#### 3. 打开 HTML 文件
构建完成后，您可以通过以下任一方式打开：

**方法 A：命令行打开**
```bash
open app/dist/index.html
```

**方法 B：文件管理器**
直接双击 `app/dist/index.html` 文件

**方法 C：浏览器地址栏**
在浏览器地址栏输入：
```
file:///Users/你的用户名/PycharmProjects/smol-training-playbook/app/dist/index.html
```

### 方式二：GitHub Pages 部署

如果您想将训练手册部署到 GitHub Pages，请按以下步骤操作：

#### 1. 推送到 GitHub
```bash
git add .
git commit -m "Add training playbook"
git push origin main
```

#### 2. 启用 GitHub Pages
1. 进入您的 GitHub 仓库
2. 点击 **Settings** 标签
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 下选择 **GitHub Actions**
5. 保存设置

#### 3. 自动部署
- 每次推送到 `main` 分支时，GitHub Actions 会自动构建和部署
- 您也可以在 Actions 标签页手动触发部署
- 部署完成后，您的网站将在 `https://你的用户名.github.io/仓库名` 可访问

## 📁 项目结构

```
smol-training-playbook/
├── app/                          # Astro 应用主目录
│   ├── dist/                     # 构建输出目录
│   │   ├── index.html           # 主页面（本地访问版本）
│   │   ├── _astro/              # 资源文件
│   │   └── ...
│   ├── src/                     # 源代码
│   ├── astro.config.mjs         # GitHub Pages 配置
│   ├── astro.config.local.mjs   # 本地访问配置
│   └── package.json             # 依赖和脚本
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions 部署配置
├── LOCAL_DEPLOYMENT.md          # 详细部署说明
└── README.md                    # 本文件
```

## 🛠️ 可用脚本

在 `app` 目录下，您可以运行以下脚本：

```bash
# 开发服务器（带热重载）
npm run dev

# 构建本地版本（相对路径，可直接打开 HTML）
npm run build:local

# 构建 GitHub Pages 版本（带 base path）
npm run build:github

# 预览构建结果
npm run preview
```

## 🔧 配置说明

### 本地访问配置 (`astro.config.local.mjs`)
- 无 base path
- 使用相对路径
- 适合直接在浏览器中打开 HTML 文件

### GitHub Pages 配置 (`astro.config.mjs`)
- 设置了 `/smol-training-playbook` base path
- 适合 GitHub Pages 部署
- 自动处理资源路径

## 📋 功能特性

- ✅ 响应式设计，支持移动端
- ✅ 深色/浅色主题切换
- ✅ 交互式图表和可视化
- ✅ 目录导航和锚点链接
- ✅ 数学公式渲染 (KaTeX)
- ✅ 代码高亮
- ✅ 图像优化 (WebP)

## 🚨 注意事项

1. **本地访问**：确保使用 `npm run build:local` 构建，这样生成的文件使用相对路径
2. **GitHub Pages**：推送前确保使用正确的配置文件
3. **资源文件**：所有图片、CSS、JS 文件都会自动处理路径
4. **浏览器兼容性**：支持现代浏览器，建议使用 Chrome、Firefox、Safari 或 Edge

## 📖 更多信息

- 查看 `LOCAL_DEPLOYMENT.md` 了解详细的部署配置
- 查看 `app/LOCAL_BUILD_TEST_REPORT.md` 了解构建测试结果
- 访问 [Astro 文档](https://docs.astro.build/) 了解更多配置选项

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

---

**享受您的训练手册之旅！** 🎉