// 最新消息頁面功能腳本

// 等待頁面載入完成
document.addEventListener('DOMContentLoaded', function() {
    initNewsPage();
});

// 初始化消息頁面
function initNewsPage() {
    // 設定事件監聽器
    setupEventListeners();
    
    // 設定預設日期
    setDefaultDates();
    
    // 載入公告數據
    loadAnnouncementData();
}

// 設定事件監聽器
function setupEventListeners() {
    // 搜尋框即時搜尋
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            debounceSearch(this.value);
        });
    }
    
    // 日期變更事件
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    
    if (startDate) {
        startDate.addEventListener('change', filterByDate);
    }
    if (endDate) {
        endDate.addEventListener('change', filterByDate);
    }
}

// 設定預設日期（當前日期）
function setDefaultDates() {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    
    if (startDate) startDate.value = dateString;
    if (endDate) endDate.value = dateString;
}

// 防抖搜尋
let searchTimeout;
function debounceSearch(keyword) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        searchNews(keyword);
    }, 300);
}

// 搜尋功能
function searchNews(keyword = null) {
    if (keyword === null) {
        keyword = document.getElementById('searchInput').value;
    }
    
    const announcements = document.querySelectorAll('.announcement-item');
    let visibleCount = 0;
    
    announcements.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        
        if (keyword === '' || title.includes(keyword.toLowerCase())) {
            item.classList.remove('hidden');
            item.classList.add('show');
            visibleCount++;
        } else {
            item.classList.add('hidden');
            item.classList.remove('show');
        }
    });
    
    // 檢查空狀態
    checkEmptyState(visibleCount, '搜尋');
}

// 日期篩選
function filterByDate() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (!startDate || !endDate) return;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // 確保結束日期不早於開始日期
    if (end < start) {
        showToast('結束日期不能早於開始日期');
        return;
    }
    
    const announcements = document.querySelectorAll('.announcement-item');
    let visibleCount = 0;
    
    announcements.forEach(item => {
        const itemDate = item.dataset.date;
        if (!itemDate) return;
        
        const announcementDate = new Date(itemDate);
        
        if (announcementDate >= start && announcementDate <= end) {
            item.classList.remove('hidden');
            item.classList.add('show');
            visibleCount++;
        } else {
            item.classList.add('hidden');
            item.classList.remove('show');
        }
    });
    
    // 檢查空狀態
    checkEmptyState(visibleCount, '日期篩選');
}

// 執行綜合搜尋
function executeSearch() {
    const keyword = document.getElementById('searchInput').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (!startDate || !endDate) {
        showToast('請選擇完整的日期範圍');
        return;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (end < start) {
        showToast('結束日期不能早於開始日期');
        return;
    }
    
    const announcements = document.querySelectorAll('.announcement-item');
    let visibleCount = 0;
    
    announcements.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const itemDate = item.dataset.date;
        
        let matchKeyword = keyword === '' || title.includes(keyword.toLowerCase());
        let matchDate = true;
        
        if (itemDate) {
            const announcementDate = new Date(itemDate);
            matchDate = announcementDate >= start && announcementDate <= end;
        }
        
        if (matchKeyword && matchDate) {
            item.classList.remove('hidden');
            item.classList.add('show');
            visibleCount++;
        } else {
            item.classList.add('hidden');
            item.classList.remove('show');
        }
    });
    
    // 檢查空狀態
    checkEmptyState(visibleCount, '綜合搜尋');
    
    // 顯示搜尋結果提示
    if (visibleCount > 0) {
        showToast(`找到 ${visibleCount} 筆相關公告`);
    }
}

// 檢查空狀態
function checkEmptyState(visibleCount, searchType) {
    const container = document.querySelector('.announcement-list');
    
    // 移除現有的空狀態
    const existingEmpty = container.querySelector('.empty-state');
    if (existingEmpty) {
        existingEmpty.remove();
    }
    
    if (visibleCount === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <i class="fas fa-search"></i>
            <h3>查無相關公告</h3>
            <p>請嘗試調整${searchType}條件</p>
        `;
        container.appendChild(emptyState);
    }
}

// 載入公告數據
function loadAnnouncementData() {
    // 模擬從後端載入數據
    const announcementData = [
        {
            id: 1,
            title: '新北市113年度低收入戶暨中低收入戶房屋租賃住宅補貼公告',
            dateRange: '2024-09-16~2024-09-28',
            date: '2024-09-16'
        },
        {
            id: 2,
            title: '夏日特惠活動開跑通知',
            dateRange: '2024-07-15~2024-07-31',
            date: '2024-07-15'
        }
        // 可以添加更多數據
    ];
    
    console.log('公告數據已載入:', announcementData.length, '筆');
}

// 查看公告詳情
function viewAnnouncement(id) {
    // 模擬公告內容
    const announcements = {
        1: {
            title: '新北市113年度低收入戶暨中低收入戶房屋租賃住宅補貼公告',
            content: '為協助低收入戶及中低收入戶家庭改善居住環境，新北市政府辦理住宅補貼計畫...',
            date: '2024-09-16',
            department: '新北市政府社會局'
        },
        2: {
            title: '新北市113年度低收入戶暨中低收入戶房屋租賃住宅補貼公告',
            content: '為協助低收入戶及中低收入戶家庭改善居住環境，新北市政府辦理住宅補貼計畫...',
            date: '2024-09-16',
            department: '新北市政府社會局'
        },
        3: {
            title: '夏日特惠活動開跑通知',
            content: '全館飲品買一送一，冰品系列享8折優惠！活動期間至7月底，數量有限售完為止。',
            date: '2024-07-15',
            department: '大毅會員中心'
        },
        4: {
            title: '健身房新器材體驗活動公告',
            content: '最新引進的智能健身器材開放體驗，專業教練現場指導，歡迎會員免費參與！',
            date: '2024-07-10',
            department: '大毅健身中心'
        },
        5: {
            title: '會員等級制度全新升級公告',
            content: '新增鑽石會員等級，享受更多專屬優惠和服務，邀請朋友加入還可獲得額外點數！',
            date: '2024-07-08',
            department: '大毅會員中心'
        },
        6: {
            title: '瑜伽冥想課程開班報名通知',
            content: '專業瑜伽老師親自授課，適合各種程度學員，現在報名享早鳥優惠價格！',
            date: '2024-07-05',
            department: '大毅健身學院'
        }
    };
    
    const announcement = announcements[id];
    if (announcement) {
        showAnnouncementModal(announcement);
    } else {
        showToast('公告內容載入失敗');
    }
}

// 顯示公告詳情彈跳視窗
function showAnnouncementModal(announcement) {
    const modal = document.createElement('div');
    modal.className = 'announcement-modal';
    modal.innerHTML = `
        <div class="announcement-modal-content">
            <div class="announcement-modal-header">
                <h3>${announcement.title}</h3>
                <span class="announcement-modal-close" onclick="closeAnnouncementModal()">&times;</span>
            </div>
            <div class="announcement-modal-body">
                <div class="announcement-meta">
                    <p><strong>發布日期：</strong>${announcement.date}</p>
                    <p><strong>發布單位：</strong>${announcement.department}</p>
                </div>
                <div class="announcement-content">
                    <p>${announcement.content}</p>
                </div>
                <div class="announcement-modal-actions">
                    <button class="modal-btn primary" onclick="closeAnnouncementModal()">關閉</button>
                    <button class="modal-btn secondary" onclick="shareAnnouncement('${announcement.title}')">分享</button>
                </div>
            </div>
        </div>
    `;
    
    // 添加樣式
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    document.body.appendChild(modal);
    
    // 點擊背景關閉
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeAnnouncementModal();
        }
    });
}

// 關閉公告彈跳視窗
function closeAnnouncementModal() {
    const modal = document.querySelector('.announcement-modal');
    if (modal) {
        modal.remove();
    }
}

// 分享公告
function shareAnnouncement(title) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: '來自里民福利服務的重要公告',
            url: window.location.href
        }).catch(err => console.log('分享失敗:', err));
    } else {
        navigator.clipboard.writeText(title).then(() => {
            showToast('公告標題已複製到剪貼簿');
        }).catch(() => {
            showToast('分享功能不支援此瀏覽器');
        });
    }
}

// 切換通知設定
function toggleNotifications() {
    showToast('通知設定功能開發中...');
}

// 底部導航功能
function goToHome() {
    window.location.href = 'member-center.html';
}

function goToNews() {
    // 已在消息頁面
    updateBottomNav(1);
}

function goToMenu() {
    window.location.href = 'line-menu.html';
}

function goToProfile() {
    window.location.href = 'member-center.html';
}

// 更新底部導航狀態
function updateBottomNav(activeIndex) {
    document.querySelectorAll('.nav-item').forEach((item, index) => {
        item.classList.toggle('active', index === activeIndex);
    });
}

// 顯示提示訊息
function showToast(message) {
    // 建立提示元素
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // 添加樣式
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-size: 14px;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // 添加到頁面
    document.body.appendChild(toast);
    
    // 顯示動畫
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 10);
    
    // 自動隱藏
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 2000);
}

// 重置搜尋
function resetSearch() {
    document.getElementById('searchInput').value = '';
    setDefaultDates();
    
    // 顯示所有項目
    const announcements = document.querySelectorAll('.announcement-item');
    announcements.forEach(item => {
        item.classList.remove('hidden');
        item.classList.add('show');
    });
    
    // 移除空狀態
    const emptyState = document.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
    
    showToast('搜尋條件已重置');
}

// CSS動畫與樣式支援
const style = document.createElement('style');
style.textContent = `
    .announcement-modal-content {
        background: white;
        border-radius: 15px;
        padding: 0;
        max-width: 550px;
        width: 100%;
        max-height: 85vh;
        overflow-y: auto;
    }
    
    .announcement-modal-header {
        padding: 25px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    
    .announcement-modal-header h3 {
        margin: 0;
        font-size: 22px;
        color: #333;
        line-height: 1.4;
        padding-right: 20px;
        font-weight: 600;
    }
    
    .announcement-modal-close {
        font-size: 28px;
        cursor: pointer;
        color: #999;
        flex-shrink: 0;
        min-width: 40px;
        min-height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.3s;
    }
    
    .announcement-modal-close:hover {
        background-color: #f3f4f6;
    }
    
    .announcement-modal-body {
        padding: 25px;
    }
    
    .announcement-meta {
        margin-bottom: 25px;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 10px;
    }
    
    .announcement-meta p {
        margin: 8px 0;
        font-size: 16px;
        color: #555;
        line-height: 1.5;
    }
    
    .announcement-meta strong {
        font-weight: 600;
        color: #333;
    }
    
    .announcement-content {
        margin-bottom: 25px;
    }
    
    .announcement-content p {
        line-height: 1.7;
        color: #555;
        font-size: 18px;
        margin-bottom: 15px;
    }
    
    .announcement-modal-actions {
        display: flex;
        gap: 15px;
        justify-content: flex-end;
    }
    
    .modal-btn {
        padding: 14px 24px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        min-height: 48px;
        min-width: 80px;
        transition: all 0.3s;
    }
    
    .modal-btn.primary {
        background: #6366f1;
        color: white;
    }
    
    .modal-btn.secondary {
        background: #f3f4f6;
        color: #374151;
        border: 2px solid #e5e7eb;
    }
    
    .modal-btn:hover {
        transform: translateY(-1px);
        opacity: 0.9;
    }
    
    .modal-btn.primary:hover {
        background: #5b56f0;
    }
    
    .modal-btn.secondary:hover {
        background: #e5e7eb;
    }
    
    /* 手機版優化 */
    @media (max-width: 768px) {
        .announcement-modal-content {
            margin: 10px;
            width: calc(100% - 20px);
        }
        
        .announcement-modal-header {
            padding: 20px;
        }
        
        .announcement-modal-header h3 {
            font-size: 20px;
        }
        
        .announcement-modal-body {
            padding: 20px;
        }
        
        .announcement-content p {
            font-size: 17px;
        }
        
        .announcement-modal-actions {
            flex-direction: column;
            gap: 10px;
        }
        
        .modal-btn {
            width: 100%;
            justify-content: center;
            padding: 16px 20px;
            min-height: 52px;
        }
    }
`;
document.head.appendChild(style);
