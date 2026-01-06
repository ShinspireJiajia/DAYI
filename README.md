# 智生活 App HTML 重現

這是一個根據智生活行動應用程式截圖製作的 HTML 網頁版本。

## 功能特色

- 📱 響應式設計，模擬手機介面
- 🎨 現代化 UI 設計，使用 CSS Grid 和 Flexbox
- 🔔 包含通知橫幅
- 🏠 主要功能區塊：我的社區、交流廳、到府服務
- 🛠️ 服務項目網格顯示
- 📐 底部導航列
- 🌈 使用 CSS 漸層和陰影效果

## 檔案結構

```
.
├── index.html      # 主要 HTML 檔案
├── styles.css      # CSS 樣式檔案
└── README.md       # 說明文件
```

## 如何使用

1. 開啟 `index.html` 檔案在瀏覽器中查看
2. 或者使用本地伺服器運行：
   ```bash
   # 使用 Python 內建伺服器
   python3 -m http.server 8000
   
   # 或使用 Node.js live-server
   npx live-server
   ```

## 設計特點

- **色彩配置**: 使用綠色系主題色 (#10b981, #22c55e)
- **字體**: 使用系統字體堆疊提供最佳閱讀體驗
- **圖示**: 使用 Font Awesome 圖示庫和 Emoji
- **佈局**: 模擬 iPhone 尺寸 (414px 寬度)
- **互動**: 包含懸停效果和按鈕樣式

## 技術細節

- HTML5 語義化標籤
- CSS3 現代特性（Grid, Flexbox, 漸層）
- 行動優先的響應式設計
- Font Awesome 圖示整合

## 瀏覽器支援

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 授權

此專案僅供學習和展示用途。
