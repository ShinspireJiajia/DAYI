// 會員中心功能腳本

// 等待頁面載入完成
document.addEventListener('DOMContentLoaded', function() {
    initMemberCenter();
});

// 初始化會員中心
function initMemberCenter() {
    // 載入會員資訊
    loadMemberInfo();
    
    // 設定事件監聽器
    setupEventListeners();
    
    // 檢查登入狀態
    checkLoginStatus();
}

// 載入會員資訊
function loadMemberInfo() {
    // 模擬從後端載入會員資料
    const memberData = {
        name: '宇慧Dora',
        level: '黃金會員',
        id: 'DY123456',
        points: 13700,
        avatar: 'https://via.placeholder.com/60x60/ff6b6b/ffffff?text=D'
    };
    
    // 更新畫面顯示
    document.getElementById('memberName').textContent = memberData.name;
    document.getElementById('currentPoints').textContent = memberData.points.toLocaleString();
    document.getElementById('memberAvatar').src = memberData.avatar;
}

// 設定事件監聽器
function setupEventListeners() {
    // QR Code 彈跳視窗關閉事件
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('qrModal');
        if (event.target === modal) {
            closeQRCode();
        }
    });
    
    // 防止QR Code內容點擊時關閉彈跳視窗
    document.querySelector('.qr-modal-content').addEventListener('click', function(event) {
        event.stopPropagation();
    });
}

// 檢查登入狀態
function checkLoginStatus() {
    // 模擬檢查登入狀態
    const isLoggedIn = true; // 實際應從localStorage或cookie檢查
    
    if (!isLoggedIn) {
        // 如果未登入，導向登入頁面
        window.location.href = 'login.html';
    }
}

// 顯示QR Code
function showQRCode() {
    const modal = document.getElementById('qrModal');
    modal.style.display = 'block';
    
    // 增加動畫效果
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// 關閉QR Code
function closeQRCode() {
    const modal = document.getElementById('qrModal');
    modal.classList.remove('show');
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// 編輯頭像
function editAvatar() {
    // 建立檔案選擇器
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('memberAvatar').src = e.target.result;
                // 這裡應該上傳到伺服器
                showToast('頭像更新成功！');
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
}

// 開啟設定頁面
function openSettings() {
    showToast('設定功能開發中...');
}

// 開啟我的優惠券
function openCoupons() {
    window.location.href = 'coupon-exchange.html';
}

// 開啟餐券兌換
function openMealVoucher() {
    window.location.href = 'meal-voucher.html';
}

// 開啟預約設備
function openSpaceBooking() {
    window.location.href = 'space-booking.html';
}

// 開啟訂單記錄
function openOrderHistory() {
    showToast('課程功能即將推出');
}

// 開啟點數記錄
function openPointsHistory() {
    window.location.href = 'points-history.html';
}

// 開啟我的最愛
function openFavorites() {
    showToast('我的最愛功能開發中...');
}

// 開啟個人資料
function openProfile() {
    showToast('個人資料功能開發中...');
}

// 開啟客服中心
function openCustomerService() {
    showToast('客服中心功能開發中...');
}

// 查看全部消息
function viewAllNews() {
    showToast('消息列表功能開發中...');
}

// 分享個人資料
function shareProfile() {
    if (navigator.share) {
        navigator.share({
            title: '大毅會員中心',
            text: '查看我的會員資料',
            url: window.location.href
        }).catch(err => console.log('分享失敗:', err));
    } else {
        // 降級處理：複製連結
        navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('連結已複製到剪貼簿');
        }).catch(() => {
            showToast('分享功能不支援此瀏覽器');
        });
    }
}

// 底部導航功能
function goToHome() {
    // 已經在首頁，不需要跳轉
    updateBottomNav(0);
}

function goToNews() {
    window.location.href = 'news.html';
}

function goToProfile() {
    window.location.href = 'profile.html';
}

// 服務項目導航功能
function openCoupons() {
    window.location.href = 'coupon-exchange.html';
}

function openMealVoucher() {
    window.location.href = 'meal-voucher.html';
}

function openSpaceBooking() {
    window.location.href = 'space-booking.html';
}

function openOrderHistory() {
    showToast('課程功能即將推出');
}

function openProfile() {
    window.location.href = 'profile.html';
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
            document.body.removeChild(toast);
        }, 300);
    }, 2000);
}

// 返回上一頁
function goBack() {
    history.back();
}

// 重新整理會員資訊
function refreshMemberInfo() {
    loadMemberInfo();
    showToast('資訊已更新');
}

// 模擬點數變化動畫
function animatePoints(newPoints) {
    const pointsElement = document.getElementById('currentPoints');
    const currentPoints = parseInt(pointsElement.textContent.replace(/,/g, ''));
    const difference = newPoints - currentPoints;
    const steps = 30;
    const stepValue = difference / steps;
    
    let step = 0;
    const timer = setInterval(() => {
        step++;
        const newValue = Math.round(currentPoints + (stepValue * step));
        pointsElement.textContent = newValue.toLocaleString();
        
        if (step >= steps) {
            clearInterval(timer);
            pointsElement.textContent = newPoints.toLocaleString();
        }
    }, 50);
}
