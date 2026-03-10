# SROI 投入管理系統 (SROI Remix App)

這是一個基於 React Router (前身為 Remix) 所建立的全端 React 應用程式，並整合了 Google Gemini AI 來輔助進行社會投資報酬率 (SROI) 的分析與計算。

> ℹ️ **專案架構與開發指南**  
> 想了解本系統的資料流程、前端分頁設計與 Gemini API 的串接方式，請參閱：[**專案架構指南 (ARCHITECTURE.md)**](./ARCHITECTURE.md)

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
