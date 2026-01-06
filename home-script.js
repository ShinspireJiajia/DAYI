/* 高年級俱樂部首頁功能 */

// 全域變數
let memberData = {
    name: '宇慧Dora',
    level: '黃金會員',
    points: 13700,
    avatar: 'https://via.placeholder.com/80x80/ff6b6b/ffffff?text=D',
    lastVisit: '2024/07/16 14:30'
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initHomePage();
    updateMemberInfo();
    loadNotifications();
    startPointsAnimation();
});

// 初始化首頁
function initHomePage() {
    // 設定事件監聽器
    setupEventListeners();
    
    // 檢查登入狀態
    checkLoginStatus();
    
    // 載入最新消息
    loadLatestNews();
    
    // 更新時間顯示
    updateLastVisit();
}

// 更新會員資訊
function updateMemberInfo() {
    document.getElementById('memberName').textContent = memberData.name;
    document.getElementById('memberLevel').textContent = memberData.level;
    document.getElementById('currentPoints').textContent = memberData.points.toLocaleString();
    document.getElementById('lastVisit').textContent = memberData.lastVisit;
    document.getElementById('memberAvatar').src = memberData.avatar;
}

// 開啟點數歷程頁面
function openPointsHistory() {
    // 添加載入動畫
    showLoading();
    
    // 延遲跳轉以顯示載入效果
    setTimeout(() => {
        window.location.href = 'points-history.html';
    }, 300);
}

// 側邊選單功能
function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.classList.toggle('active');
}

// 顯示通知
function showNotifications() {
    const notifications = [
        {
            title: 'SPA 預約提醒',
            message: '您明天下午 2:00 有 SPA 預約',
            time: '5分鐘前',
            type: 'reminder'
        },
        {
            title: '點數到帳通知',
            message: '您獲得了 500 點數獎勵',
            time: '1小時前',
            type: 'points'
        },
        {
            title: '新優惠券',
            message: '夏季 SPA 8折優惠券已發放',
            time: '2小時前',
            type: 'coupon'
        }
    ];
    
    showNotificationModal(notifications);
}

// 顯示通知彈跳視窗
function showNotificationModal(notifications) {
    const modal = document.createElement('div');
    modal.className = 'notification-modal';
    modal.innerHTML = `
        <div class="notification-content">
            <div class="notification-header">
                <h3><i class="fas fa-bell"></i> 通知訊息</h3>
                <span class="close-btn" onclick="closeNotificationModal()">&times;</span>
            </div>
            <div class="notification-list">
                ${notifications.map(notif => `
                    <div class="notification-item ${notif.type}">
                        <div class="notif-icon">
                            <i class="fas fa-${getNotificationIcon(notif.type)}"></i>
                        </div>
                        <div class="notif-content">
                            <h4>${notif.title}</h4>
                            <p>${notif.message}</p>
                            <span class="notif-time">${notif.time}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="notification-footer">
                <button onclick="markAllAsRead()">全部標記為已讀</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

// 關閉通知彈跳視窗
function closeNotificationModal() {
    const modal = document.querySelector('.notification-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => document.body.removeChild(modal), 300);
    }
}

// 獲取通知圖示
function getNotificationIcon(type) {
    const icons = {
        reminder: 'clock',
        points: 'coins',
        coupon: 'gift',
        news: 'newspaper'
    };
    return icons[type] || 'bell';
}

// 標記所有通知為已讀
function markAllAsRead() {
    document.querySelector('.notification-badge').style.display = 'none';
    showToast('已標記所有通知為已讀');
    closeNotificationModal();
}

// 導航功能
function goToNews() {
    window.location.href = 'news.html';
}

function goToProfile() {
    window.location.href = 'profile.html';
}

// 快捷功能
function openCoupons() {
    window.location.href = 'coupon-exchange.html';
}

function openBooking() {
    window.location.href = 'space-booking.html';
}

function openProfile() {
    window.location.href = 'profile.html';
}

// 服務功能
function openService(serviceType) {
    const services = {
        spa: '預約 SPA 服務',
        fitness: '預約健身房',
        restaurant: '預約餐廳',
        pool: '預約游泳池'
    };
    
    showToast(`即將開啟${services[serviceType] || '服務'}預約`);
    
    // 這裡可以跳轉到對應的預約頁面
    setTimeout(() => {
        window.location.href = 'space-booking.html';
    }, 1000);
}

// 新聞功能
function openNews(newsId) {
    showToast(`正在載入新聞內容...`);
    setTimeout(() => {
        window.location.href = `news.html#news-${newsId}`;
    }, 500);
}

// 選單功能
function openSettings() {
    showToast('設定功能開發中');
}

function contactUs() {
    showToast('客服電話：02-1234-5678');
}

function logout() {
    if (confirm('確定要登出嗎？')) {
        showToast('正在登出...');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
}

// 載入最新消息
function loadLatestNews() {
    // 模擬從 API 載入新聞
    const newsData = [
        {
            id: '1',
            date: '2024/07/15',
            title: '夏季養生SPA特惠活動開跑',
            preview: '炎炎夏日，來享受專業SPA服務，讓身心得到完全放鬆...',
            isNew: true
        },
        {
            id: '2',
            date: '2024/07/12',
            title: '健身房設備升級完成',
            preview: '全新進口健身器材已安裝完成，歡迎會員們前來體驗...',
            isNew: false
        },
        {
            id: '3',
            date: '2024/07/10',
            title: '會員專屬餐廳新菜單上線',
            preview: '主廚精心設計的夏季養生菜單現已推出，營養美味兼具...',
            isNew: false
        }
    ];
    
    // 這裡可以動態更新新聞列表
    console.log('載入新聞數據:', newsData);
}

// 載入通知數據
function loadNotifications() {
    // 模擬通知數量
    const notificationCount = 3;
    const badge = document.querySelector('.notification-badge');
    
    if (notificationCount > 0) {
        badge.textContent = notificationCount;
        badge.style.display = 'block';
    } else {
        badge.style.display = 'none';
    }
}

// 點數動畫
function startPointsAnimation() {
    const pointsElement = document.getElementById('currentPoints');
    const targetPoints = memberData.points;
    const duration = 1500;
    const increment = targetPoints / (duration / 50);
    
    let currentPoints = 0;
    const timer = setInterval(() => {
        currentPoints += increment;
        
        if (currentPoints >= targetPoints) {
            currentPoints = targetPoints;
            clearInterval(timer);
        }
        
        pointsElement.textContent = Math.floor(currentPoints).toLocaleString();
    }, 50);
}

// 更新上次造訪時間
function updateLastVisit() {
    const now = new Date();
    const visitTime = now.toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).replace(/\//g, '/');
    
    // 儲存到本地存儲
    localStorage.setItem('lastVisit', visitTime);
}

// 檢查登入狀態
function checkLoginStatus() {
    // 模擬檢查登入狀態
    const isLoggedIn = localStorage.getItem('isLoggedIn') !== 'false';
    
    if (!isLoggedIn) {
        // 如果未登入，可以重新導向到登入頁
        // window.location.href = 'login.html';
    }
}

// 設定事件監聽器
function setupEventListeners() {
    // 點擊外部關閉側邊選單
    document.addEventListener('click', function(event) {
        const sideMenu = document.getElementById('sideMenu');
        const menuButton = document.querySelector('.nav-left');
        
        if (sideMenu.classList.contains('active') && 
            !sideMenu.contains(event.target) && 
            !menuButton.contains(event.target)) {
            toggleMenu();
        }
    });
    
    // 防止選單內容點擊時關閉選單
    document.querySelector('.menu-content').addEventListener('click', function(event) {
        event.stopPropagation();
    });
}

// 顯示載入動畫
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading-overlay';
    loading.innerHTML = `
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <p>載入中...</p>
        </div>
    `;
    
    document.body.appendChild(loading);
    
    setTimeout(() => {
        if (document.body.contains(loading)) {
            document.body.removeChild(loading);
        }
    }, 2000);
}

// 顯示提示訊息
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 16px;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
        max-width: 300px;
        text-align: center;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, duration);
}

// 添加通知彈跳視窗的CSS樣式
const notificationStyles = `
<style>
.notification-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.notification-modal.show {
    opacity: 1;
}

.notification-content {
    background: white;
    border-radius: 20px;
    width: 90%;
    max-width: 400px;
    max-height: 80vh;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.notification-header {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.notification-header h3 {
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
}

.close-btn {
    font-size: 24px;
    cursor: pointer;
    line-height: 1;
}

.notification-list {
    max-height: 400px;
    overflow-y: auto;
    padding: 10px 0;
}

.notification-item {
    display: flex;
    gap: 15px;
    padding: 15px 20px;
    border-bottom: 1px solid #f3f4f6;
    transition: background-color 0.3s;
}

.notification-item:hover {
    background: #f9fafb;
}

.notification-item:last-child {
    border-bottom: none;
}

.notif-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: white;
    flex-shrink: 0;
}

.notification-item.reminder .notif-icon {
    background: #3b82f6;
}

.notification-item.points .notif-icon {
    background: #f59e0b;
}

.notification-item.coupon .notif-icon {
    background: #ef4444;
}

.notif-content h4 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
    color: #1f2937;
}

.notif-content p {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 6px;
    line-height: 1.4;
}

.notif-time {
    font-size: 12px;
    color: #9ca3af;
}

.notification-footer {
    padding: 15px 20px;
    border-top: 1px solid #f3f4f6;
    text-align: center;
}

.notification-footer button {
    background: #6366f1;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s;
}

.notification-footer button:hover {
    background: #5b21b6;
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loading-spinner {
    text-align: center;
    color: #6366f1;
}

.loading-spinner i {
    font-size: 32px;
    margin-bottom: 10px;
}

.loading-spinner p {
    font-size: 16px;
    font-weight: 500;
}
</style>
`;

// 插入樣式到頁面
document.head.insertAdjacentHTML('beforeend', notificationStyles);
