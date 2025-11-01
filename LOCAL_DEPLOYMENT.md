# 本地部署和GitHub Pages部署指南

这个项目已经配置为支持两种部署方式：

## 🖥️ 本地HTML文件访问

如果你想要生成可以直接在浏览器中打开的HTML文件（不需要服务器），请使用：

```bash
cd app
npm run build:local
```

这将在 `app/dist/` 目录中生成静态文件，你可以直接双击 `dist/index.html` 在浏览器中打开。

## 🌐 GitHub Pages部署

项目已经配置为自动部署到GitHub Pages。

### 自动部署设置

1. **推送到main分支**：每次推送到main分支时，GitHub Actions会自动构建和部署网站
2. **手动触发**：你也可以在GitHub仓库的Actions页面手动触发部署

### GitHub Pages设置

确保在你的GitHub仓库中启用GitHub Pages：

1. 进入仓库的 **Settings** 页面
2. 滚动到 **Pages** 部分
3. 在 **Source** 下选择 **GitHub Actions**
4. 保存设置

### 访问网站

部署完成后，你的网站将在以下地址可用：
```
https://[你的用户名].github.io/smol-training-playbook
```

## 📝 构建脚本说明

- `npm run build:local` - 构建本地版本（无base路径，可直接打开HTML文件）
- `npm run build:github` - 构建GitHub Pages版本（包含base路径）
- `npm run build` - 默认构建GitHub Pages版本
- `npm run dev` - 启动开发服务器
- `npm run preview` - 预览构建结果

## 🔧 配置文件说明

- `astro.config.mjs` - GitHub Pages部署配置（包含base路径）
- `astro.config.local.mjs` - 本地部署配置（无base路径）
- `.github/workflows/deploy.yml` - GitHub Actions自动部署配置

## 🚀 快速开始

1. **本地开发**：
   ```bash
   cd app
   npm install
   npm run dev
   ```

2. **构建本地版本**：
   ```bash
   npm run build:local
   # 然后打开 dist/index.html
   ```

3. **部署到GitHub Pages**：
   ```bash
   git add .
   git commit -m "Update content"
   git push origin main
   # GitHub Actions会自动部署
   ```

## 📋 注意事项

- 本地版本和GitHub Pages版本使用不同的配置文件
- GitHub Pages版本包含 `/smol-training-playbook` base路径
- 本地版本使用相对路径，可以直接在文件系统中打开
- 所有静态资源（图片、CSS、JS）都会被正确处理