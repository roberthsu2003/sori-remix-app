# SROI 投入管理系統 (SROI Remix App)

這是一個基於 React Router (前身為 Remix) 所建立的全端 React 應用程式，並整合了 Google Gemini AI 來輔助進行社會投資報酬率 (SROI) 的分析與計算。

> 📌 **專案來源說明**：本專案由 Google AI Studio 專案轉換而來。若您想從頭建立一個 React Router 專案，可參考下方「從頭建立專案」的指令。

> ℹ️ **專案指南與教學**（詳見 [`docs/`](./docs/) 資料夾）
> - **系統架構與開發**：想了解資料流程、前端分頁設計與 Gemini API 串接，請參閱 [**專案架構指南**](./docs/ARCHITECTURE.md)
> - **App.tsx 功能說明**：核心元件狀態管理與 SROI 分析流程，請參閱 [**APP_FUNCTIONALITY.md**](./docs/APP_FUNCTIONALITY.md)
> - **專案上線與部署**：使用 Render 雲端將本專案發佈上線的圖文流程，請參閱 [**Render 部署教學**](./docs/RENDER_DEPLOY.md)

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## ✨ 功能特色 (Features)

- 🚀 伺服器端渲染 (Server-side rendering) 
- ⚡️ 熱模組替換 (Hot Module Replacement, HMR)
- 📦 資源打包與最佳化 (Asset bundling and optimization)
- 🔄 資料載入與狀態變更 (Data loading and mutations)
- 🔒 預設支援 TypeScript
- 🎉 內建 TailwindCSS 以處理 UI 樣式
- 🤖 後端整合 Gemini API 進行專案解析與自動報告產出
- 📖 [React Router 官方文件](https://reactrouter.com/)

## 🆕 從頭建立專案 (Creating a New Project)

若您想從零開始建立一個 React Router 專案（例如從 Google AI Studio 轉換），可使用官方 CLI 建立：

```bash
# 使用 create-react-router 建立新專案
npx create-react-router@latest my-react-router-app

# 進入專案目錄
cd my-react-router-app

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

應用程式將在 `http://localhost:5173` 運行。

若需使用特定模板，可指定模板名稱：

```bash
npx create-react-router@latest --template remix-run/react-router-templates/<template-name>
```

> 💡 本專案目前使用 React Router v7。建立完成後，可參考本專案結構與 [ARCHITECTURE.md](./docs/ARCHITECTURE.md) 來整合 Gemini API 與 SROI 功能。

## 🚀 快速開始 (Getting Started)

### 安裝依賴 (Installation)

安裝所需的 npm 套件：

```bash
npm install
```

### 開發模式 (Development)

啟動支援 HMR 的開發伺服器：

```bash
npm run dev
```

您的應用程式將會在 `http://localhost:5173` 運行。

## 🏗️ 建立正式環境版本 (Building for Production)

建立正式版 (Production) 的編譯輸出：

```bash
npm run build
```

## 🌍 部署 (Deployment)

### 使用 Docker 部署 (Docker Deployment)

使用 Docker 建立並運行映像檔：

```bash
docker build -t my-app .

# 運行容器 (將內部 3000 port 映射到本機)
docker run -p 3000:3000 my-app
```

容器化的應用程式可以輕易部署到任何支援 Docker 的雲端平台，包含：

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway (Render)

### 自行伺服器部署 (DIY Deployment)

如果您熟悉 Node 應用程式的部署流程，本應用內建的 Node 伺服器已達到正式環境標準。

部署時，請確保上傳 `npm run build` 產出的 `build` 資料夾及相關套件設定：

```text
├── package.json
├── package-lock.json
├── build/
│   ├── client/    # 靜態資源 (前端)
│   └── server/    # 伺服器端程式碼 (後端 API)
```

## 🎨 樣式與排版 (Styling)

此範本已經預先設定好 [Tailwind CSS](https://tailwindcss.com/)，以確保在開發介面時能有最有效率的體驗。

---

使用 ❤️ 與 React Router 打造。
