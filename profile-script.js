// 個人資料頁面互動功能

// 頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('個人資料頁面載入完成');
    // 預設收合個人詳細資料
    const profileDetails = document.getElementById('profileDetails');
    if (profileDetails) {
        profileDetails.classList.add('collapsed');
    }
});

// 切換個人資料詳情顯示/隱藏
function toggleProfileDetails() {
    const profileDetails = document.getElementById('profileDetails');
    const toggleIcon = document.getElementById('toggleIcon');
    const expandToggle = document.querySelector('.expand-toggle');
    
    if (profileDetails.style.display === 'none') {
        // 展開
        profileDetails.style.display = 'block';
        profileDetails.classList.remove('collapsed');
        toggleIcon.classList.remove('fa-chevron-down');
        toggleIcon.classList.add('fa-chevron-up');
        expandToggle.classList.add('expanded');
        
        // 平滑動畫
        setTimeout(() => {
            profileDetails.style.opacity = '1';
        }, 10);
    } else {
        // 收合
        profileDetails.style.opacity = '0';
        toggleIcon.classList.remove('fa-chevron-up');
        toggleIcon.classList.add('fa-chevron-down');
        expandToggle.classList.remove('expanded');
        
        // 延遲隱藏，讓動畫完成
        setTimeout(() => {
            profileDetails.style.display = 'none';
            profileDetails.classList.add('collapsed');
        }, 300);
    }
}

// 編輯個人資料
function editProfile() {
    alert('編輯個人資料功能開發中...\n將開啟個人資料編輯表單');
}

// 開啟履約資訊查詢
function openContractInfo() {
    showModal('contractModal');
}

// 開啟金流帳單
function openBilling() {
    showModal('billingModal');
}

// 開啟健康紀錄
function openHealthRecord() {
    alert('健康紀錄功能開發中...\n將顯示健康檢查記錄、用藥資訊等');
}

// 開啟服務歷史
function openServiceHistory() {
    alert('服務歷史功能開發中...\n將顯示過往使用的各項服務記錄');
}

// 開啟設定
function openSettings() {
    alert('設定功能開發中...\n將包含隱私設定、通知設定、字體大小調整等');
}

// 顯示彈跳視窗
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 防止背景滾動
        
        // 加入淡入動畫
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

// 關閉彈跳視窗
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // 加入淡出動畫
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // 恢復背景滾動
        }, 300);
    }
}

// 點擊彈跳視窗外部關閉
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            closeModal(modal.id);
        }
    });
}

// 底部導航功能
function goToHome() {
    window.location.href = 'member-center.html';
}

function goToServices() {
    alert('服務頁面功能開發中...\n將顯示各項服務選項');
}

function goToNews() {
    window.location.href = 'news.html';
}

// 模擬資料更新功能
function refreshData() {
    console.log('重新載入個人資料...');
    // 這裡可以加入從伺服器載入最新資料的邏輯
}

// 緊急聯絡功能
function emergencyCall() {
    if (confirm('確定要撥打緊急聯絡電話嗎？\n將撥打：0987-654-321')) {
        window.location.href = 'tel:0987654321';
    }
}

// 列印功能
function printProfile() {
    window.print();
}

// 匯出個人資料
function exportProfile() {
    alert('匯出功能開發中...\n將產生 PDF 格式的個人資料檔案');
}

// 鍵盤快捷鍵支援
document.addEventListener('keydown', function(event) {
    // ESC 鍵關閉彈跳視窗
    if (event.key === 'Escape') {
        const visibleModal = document.querySelector('.modal[style*="block"]');
        if (visibleModal) {
            closeModal(visibleModal.id);
        }
    }
    
    // Enter 鍵確認操作
    if (event.key === 'Enter' && event.target.classList.contains('menu-item')) {
        event.target.click();
    }
});

// 觸控手勢支援（為年長者優化）
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchend', function(event) {
    if (!touchStartX || !touchStartY) {
        return;
    }
    
    let touchEndX = event.changedTouches[0].clientX;
    let touchEndY = event.changedTouches[0].clientY;
    
    let diffX = touchStartX - touchEndX;
    let diffY = touchStartY - touchEndY;
    
    // 左右滑動切換頁面（需要滑動距離大於 100px）
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 100) {
        if (diffX > 0) {
            // 向左滑動 - 下一頁
            console.log('向左滑動');
        } else {
            // 向右滑動 - 上一頁或返回
            console.log('向右滑動');
            history.back();
        }
    }
    
    // 重置觸控點
    touchStartX = 0;
    touchStartY = 0;
});

// 無障礙功能增強
function enhanceAccessibility() {
    // 為所有可點擊元素增加鍵盤導航支援
    const clickableElements = document.querySelectorAll('.menu-item, .nav-item, .edit-btn');
    
    clickableElements.forEach(element => {
        // 確保元素可以獲得焦點
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
        
        // 增加 ARIA 標籤
        if (!element.hasAttribute('role')) {
            element.setAttribute('role', 'button');
        }
        
        // 鍵盤事件支援
        element.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
        
        // 焦點樣式增強
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid #6366f1';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// 字體大小調整功能（年長者友善）
let currentFontSize = 16;

function increaseFontSize() {
    currentFontSize += 2;
    if (currentFontSize > 24) currentFontSize = 24;
    document.body.style.fontSize = currentFontSize + 'px';
    localStorage.setItem('preferredFontSize', currentFontSize);
}

function decreaseFontSize() {
    currentFontSize -= 2;
    if (currentFontSize < 14) currentFontSize = 14;
    document.body.style.fontSize = currentFontSize + 'px';
    localStorage.setItem('preferredFontSize', currentFontSize);
}

function resetFontSize() {
    currentFontSize = 16;
    document.body.style.fontSize = currentFontSize + 'px';
    localStorage.setItem('preferredFontSize', currentFontSize);
}

// 載入使用者偏好的字體大小
function loadPreferredFontSize() {
    const savedFontSize = localStorage.getItem('preferredFontSize');
    if (savedFontSize) {
        currentFontSize = parseInt(savedFontSize);
        document.body.style.fontSize = currentFontSize + 'px';
    }
}

// 頁面載入時執行無障礙功能增強
document.addEventListener('DOMContentLoaded', function() {
    enhanceAccessibility();
    loadPreferredFontSize();
});
