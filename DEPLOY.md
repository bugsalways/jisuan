# 部署指南 (Deployment Guide)

本文档将指导你如何将本项目上传到 GitHub，并部署到你已购买的域名上。

本项目是纯静态网站（React + Vite），部署非常简单。我们推荐使用 **Vercel** 或 **GitHub Pages** 进行托管，它们都免费且支持自定义域名。

---

## 第一步：上传代码到 GitHub

在开始部署之前，你需要将本地代码上传到 GitHub 仓库。

1.  **在 GitHub 上创建新仓库**
    *   登录 [GitHub](https://github.com/)。
    *   点击右上角的 `+` -> `New repository`。
    *   输入仓库名称（例如 `easy-calc`），选择 `Public`（公开）或 `Private`（私有），点击 `Create repository`。

2.  **推送本地代码**
    在你的项目根目录打开终端，执行以下命令（将 `<你的用户名>` 和 `<仓库名>` 替换为实际信息）：

    ```bash
    # 初始化 git (如果尚未初始化)
    git init

    # 添加所有文件
    git add .

    # 提交更改
    git commit -m "Initial commit"

    # 关联远程仓库
    git remote add origin https://github.com/<你的用户名>/<仓库名>.git

    # 推送到 GitHub
    git push -u origin main
    ```

---

## 第二步：选择部署方案

### 方案 A：使用 Vercel 部署（🔥 强烈推荐）

Vercel 是 React/Vite 项目的最佳部署平台，**速度快、配置简单、自动配置 HTTPS**。

1.  **注册/登录 Vercel**
    *   访问 [Vercel.com](https://vercel.com/)。
    *   选择 `Continue with GitHub` 进行登录。

2.  **导入项目**
    *   在 Dashboard 点击 `Add New...` -> `Project`。
    *   在 `Import Git Repository` 列表中找到你刚才上传的 `easy-calc` 仓库，点击 `Import`。

3.  **配置与部署**
    *   **Framework Preset**: Vercel 会自动识别为 `Vite`，无需修改。
    *   **Build Command**: 默认 `npm run build`，无需修改。
    *   **Output Directory**: 默认 `dist`，无需修改。
    *   点击 **Deploy** 按钮。
    *   等待约 1 分钟，看到满屏彩带即表示部署成功！

4.  **绑定自定义域名**
    *   在 Vercel 项目页面，点击 `Settings` -> `Domains`。
    *   在输入框中输入你购买的域名（例如 `www.example.com`），点击 `Add`。
    *   Vercel 会提示你如何配置 DNS。通常需要添加一条 `CNAME` 记录指向 `cname.vercel-dns.com`。

---

### 方案 B：使用 GitHub Pages 部署

如果你不想使用第三方平台，也可以直接用 GitHub Pages。

1.  **修改 `vite.config.ts`**
    *   如果你打算使用自定义域名（如 `www.yourdomain.com`），**不需要**修改 base 路径。
    *   如果你暂时不绑定域名，通过 `username.github.io/repo` 访问，则需要修改 `vite.config.ts`：
        ```typescript
        export default defineConfig({
          base: '/仓库名/', // 替换为你的 GitHub 仓库名
          // ...其他配置
        })
        ```

2.  **安装部署工具**
    ```bash
    npm install gh-pages --save-dev
    ```

3.  **修改 `package.json`**
    在 `scripts` 字段中添加：
    ```json
    "scripts": {
      // ...其他脚本
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```

4.  **一键部署**
    ```bash
    npm run deploy
    ```
    命令执行完成后，代码会被推送到 `gh-pages` 分支。

5.  **配置 GitHub Pages 及域名**
    *   进入 GitHub 仓库 -> `Settings` -> `Pages`。
    *   **Build and deployment** -> Source 选择 `Deploy from a branch`。
    *   **Branch** 选择 `gh-pages` / `root`，点击 Save。
    *   **Custom domain**: 输入你的域名（如 `www.example.com`），点击 Save。GitHub 会自动创建一个 `CNAME` 文件在你的仓库中。
    *   勾选 `Enforce HTTPS`。

---

## 第三步：配置域名解析 (DNS)

无论你选择 Vercel 还是 GitHub Pages，都需要去你的域名服务商（阿里云/腾讯云/GoDaddy等）配置 DNS 解析。

**以 Vercel 为例：**

1.  登录你的域名管理控制台。
2.  找到 **DNS 解析** 或 **解析设置**。
3.  添加记录：
    *   **记录类型**: `CNAME`
    *   **主机记录 (Host)**: `www` (或者 `@` 如果支持 CNAME Flattening)
    *   **记录值 (Value)**: `cname.vercel-dns.com`
4.  保存后，等待几分钟至几小时生效。

**以 GitHub Pages 为例：**

1.  添加记录：
    *   **记录类型**: `CNAME`
    *   **主机记录**: `www`
    *   **记录值**: `<你的GitHub用户名>.github.io`
2.  (可选) 如果需要解析根域名 (`example.com`)，通常添加 4 条 `A` 记录指向 GitHub 的 IP：
    *   `185.199.108.153`
    *   `185.199.109.153`
    *   `185.199.110.153`
    *   `185.199.111.153`

---

## 常见问题

**Q: 部署后刷新页面报 404 错误？**
A: 这是单页应用 (SPA) 的常见问题。
*   **Vercel**: 自动处理，无需配置。
*   **GitHub Pages**: 需要创建一个 `404.html`，内容和 `index.html` 一样；或者使用 `HashRouter` 代替 `BrowserRouter` (在 `src/App.tsx` 中修改)。建议使用 Vercel 可以避免这个问题。

**Q: 域名解析多久生效？**
A: 全球生效通常需要 10分钟 - 24小时，但通常几分钟内就能访问。

**Q: 为什么图片加载不出来？**
A: 检查代码中引用图片是否使用了绝对路径。建议使用 `import img from './assets/...'` 的方式引用。
