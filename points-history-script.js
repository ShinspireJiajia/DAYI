/* 點數記錄頁面功能 */

// 全域變數
let allHistoryData = [];
let filteredData = [];
let currentDisplayCount = 12;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 載入點數歷程數據
    loadHistoryData();
    
    // 顯示初始數據
    displayHistory();
    
    // 設定預設日期範圍
    setDefaultDateRange();
    
    // 綁定事件監聽器
    bindEventListeners();
});

// 載入歷程數據
function loadHistoryData() {
    // 模擬從後端API獲取的數據
    const rawData = [
        {
            date: '2024/03/01 09:30',
            type: 'used',
            title: '報名完成',
            description: '課程報名扣點',
            points: -100,
            icon: 'fas fa-clipboard-check',
            cardType: 'primary',
            isCourse: true,
            courseDate: '2024/03/05',
            courseName: '有氧舞蹈',
            courseCode: 'AERO-003'
        },
        {
            date: '2024/02/28 10:00',
            type: 'earned',
            title: '課程取消退還',
            description: '瑜珈課程取消',
            points: 100,
            icon: 'fas fa-undo',
            cardType: 'primary',
            isCourse: true,
            courseDate: '2024/02/28',
            courseName: '瑜珈課程',
            courseCode: 'YOGA-001'
        },
        {
            date: '2024/02/28 09:00',
            type: 'earned',
            title: '課程取消退還',
            description: '缺席扣款',
            points: 0,
            icon: 'fas fa-undo',
            cardType: 'primary',
            isCourse: true,
            courseDate: '2024/02/28',
            courseName: '有氧運動',
            courseCode: 'AERO-002'
        },
        {
            date: '2024/02/25 12:30',
            type: 'used',
            title: '桑拿浴室',
            description: '芬蘭浴 - 45分鐘',
            points: -120,
            icon: 'fas fa-leaf',
            cardType: 'primary'
        },
        {
            date: '2024/02/22 10:15',
            type: 'earned',
            title: '推薦獎勵',
            description: '推薦朋友入會',
            points: 500,
            icon: 'fas fa-star',
            cardType: 'primary'
        },
        {
            date: '2024/02/18 14:00',
            type: 'used',
            title: 'SPA 服務',
            description: '臉部護理 - 60分鐘',
            points: -300,
            icon: 'fas fa-spa',
            cardType: 'supplementary'
        },
        {
            date: '2024/02/14 16:30',
            type: 'earned',
            title: '節日活動',
            description: '情人節特別活動參與',
            points: 100,
            icon: 'fas fa-heart',
            cardType: 'primary'
        },
        {
            date: '2024/02/12 08:45',
            type: 'used',
            title: '健身房使用',
            description: '團體課程 - 有氧運動',
            points: -100,
            icon: 'fas fa-dumbbell',
            cardType: 'supplementary',
            isCourse: true,
            courseDate: '2024/02/12',
            courseName: '有氧運動',
            courseCode: 'AERO-002'
        },
        {
            date: '2024/02/08 15:10',
            type: 'used',
            title: '餐廳消費',
            description: '健康輕食套餐',
            points: -150,
            icon: 'fas fa-utensils',
            cardType: 'primary'
        },
        {
            date: '2024/02/05 13:20',
            type: 'earned',
            title: '生日禮物',
            description: '生日月份專屬贈點',
            points: 200,
            icon: 'fas fa-birthday-cake',
            cardType: 'primary'
        },
        {
            date: '2024/02/02 11:30',
            type: 'used',
            title: '游泳池使用',
            description: '標準池 - 1小時',
            points: -80,
            icon: 'fas fa-swimming-pool',
            cardType: 'supplementary'
        },
        {
            date: '2024/01/25 09:00',
            type: 'earned',
            title: '活動參與獎勵',
            description: '瑜珈課程完成',
            points: 50,
            icon: 'fas fa-calendar-check',
            cardType: 'primary',
            isCourse: true,
            courseDate: '2024/01/25',
            courseName: '瑜珈課程',
            courseCode: 'YOGA-001'
        },
        {
            date: '2024/01/20 16:45',
            type: 'used',
            title: 'SPA 服務',
            description: '全身按摩 - 90分鐘',
            points: -500,
            icon: 'fas fa-spa',
            cardType: 'supplementary'
        },
        {
            date: '2024/01/18 10:15',
            type: 'used',
            title: '健身房使用',
            description: '器械訓練區 - 2小時',
            points: -100,
            icon: 'fas fa-dumbbell',
            cardType: 'primary'
        },
        {
            date: '2024/01/15 14:30',
            type: 'earned',
            title: '入會贈送點數',
            description: '新會員歡迎禮',
            points: 1000,
            icon: 'fas fa-gift',
            cardType: 'primary'
        }
    ];

    // 僅顯示正卡 (primary) 的交易點數明細
    allHistoryData = rawData.filter(item => item.cardType === 'primary');
    
    // 複製到篩選數據
    filteredData = [...allHistoryData];
}

// 顯示歷程
function displayHistory() {
    const historyList = document.getElementById('historyList');
    const displayData = filteredData.slice(0, currentDisplayCount);
    
    historyList.innerHTML = '';
    
    if (displayData.length === 0) {
        historyList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <h3>沒有找到記錄</h3>
                <p>請調整篩選條件或稍後再試</p>
            </div>
        `;
        return;
    }
    
    displayData.forEach(item => {
        const historyItem = createHistoryItem(item);
        historyList.appendChild(historyItem);
    });
    
    // 更新載入更多按鈕顯示狀態
    updateLoadMoreButton();
}

// 建立歷程項目元素
function createHistoryItem(item) {
        const div = document.createElement('div');
        div.className = `history-card ${item.type}`;
        
        let pointsFormatted;
        let typeClass = item.type;
        
        if (item.points === 0) {
            pointsFormatted = "0";
            typeClass = "neutral";
        } else {
            pointsFormatted = item.points > 0 ? `+${item.points.toLocaleString()}` : item.points.toLocaleString();
        }
        
        let descriptionHtml = `<div class="h-desc">${item.description}</div>`;
        
        if (item.isCourse) {
            descriptionHtml += `
                <div class="course-details" style="font-size: 12px; color: #6b7280; margin-top: 4px;">
                    <div>課程日期: ${item.courseDate}</div>
                    <div>課程名稱: ${item.courseName}</div>
                    <div>課程代碼: ${item.courseCode}</div>
                </div>
            `;
        }

        div.innerHTML = `
            <div class="h-left">
                <div class="h-icon"><i class="${item.icon}"></i></div>
                <div class="h-text">
                    <div class="h-title">
                        ${item.title}
                    </div>
                    ${descriptionHtml}
                </div>
            </div>
            <div class="h-right">
                <div class="h-points ${typeClass}">${pointsFormatted}</div>
                <div class="h-date">${item.date}</div>
            </div>
        `;
        return div;
}

// 更新載入更多按鈕
function updateLoadMoreButton() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const loadMoreContainer = document.querySelector('.load-more');
    
    if (currentDisplayCount >= filteredData.length) {
        loadMoreContainer.style.display = 'none';
    } else {
        loadMoreContainer.style.display = 'block';
        const remainingCount = filteredData.length - currentDisplayCount;
        loadMoreBtn.innerHTML = `
            <i class="fas fa-plus"></i> 
            載入更多紀錄 (還有 ${remainingCount} 筆)
        `;
    }
}

// 載入更多歷程
function loadMoreHistory() {
    currentDisplayCount += 12;
    displayHistory();
    
    // 滾動到新載入的內容
    setTimeout(() => {
        const historyItems = document.querySelectorAll('.history-card');
        const targetItem = historyItems[Math.max(0, currentDisplayCount - 12)];
        if (targetItem) {
            targetItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
}

// 顯示/隱藏篩選
function showPointsFilter() {
    const filterSection = document.getElementById('filterSection');
    const isVisible = filterSection.style.display !== 'none';
    
    if (isVisible) {
        filterSection.style.display = 'none';
    } else {
        filterSection.style.display = 'block';
        setTimeout(() => {
            filterSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

// 套用篩選
function applyFilter() {
    const typeFilter = document.getElementById('typeFilter').value;
    const cardTypeFilter = document.getElementById('cardTypeFilter').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    // 重設顯示數量
    currentDisplayCount = 12;
    
    // 篩選數據
    filteredData = allHistoryData.filter(item => {
        // 類型篩選
        if (typeFilter !== 'all' && item.type !== typeFilter) {
            return false;
        }

        // 卡片類型篩選
        if (cardTypeFilter !== 'all' && item.cardType !== cardTypeFilter) {
            return false;
        }
        
        // 日期篩選
        if (startDate || endDate) {
            const itemDate = new Date(item.date.split(' ')[0]);
            
            if (startDate && itemDate < new Date(startDate)) {
                return false;
            }
            
            if (endDate && itemDate > new Date(endDate)) {
                return false;
            }
        }
        
        return true;
    });
    
    // 更新顯示
    displayHistory();
    
    // 隱藏篩選區域
    document.getElementById('filterSection').style.display = 'none';
    
    // 顯示篩選結果提示
    showFilterResult();
}

// 重設篩選
function resetFilter() {
    document.getElementById('typeFilter').value = 'all';
    document.getElementById('cardTypeFilter').value = 'all';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    
    // 重設數據
    filteredData = [...allHistoryData];
    currentDisplayCount = 12;
    
    // 更新顯示
    displayHistory();
    
    // 隱藏篩選區域
    document.getElementById('filterSection').style.display = 'none';
}

// 顯示篩選結果
function showFilterResult() {
    const totalCount = filteredData.length;
    const allCount = allHistoryData.length;
    
    if (totalCount < allCount) {
        // 可以在這裡添加提示訊息
        console.log(`篩選結果：找到 ${totalCount} 筆記錄，共 ${allCount} 筆`);
    }
}

// 設定預設日期範圍
function setDefaultDateRange() {
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    
    // 可以設定預設範圍，但暫時留空讓使用者自行選擇
    // document.getElementById('startDate').value = threeMonthsAgo.toISOString().split('T')[0];
    // document.getElementById('endDate').value = today.toISOString().split('T')[0];
}

// 綁定事件監聽器
function bindEventListeners() {
    // 篩選表單提交
    const filterInputs = document.querySelectorAll('#typeFilter, #cardTypeFilter, #startDate, #endDate');
    filterInputs.forEach(input => {
        input.addEventListener('change', function() {
            // 可以添加即時篩選功能
            // applyFilter();
        });
    });
}

// 返回上一頁
function goBack() {
    if (document.referrer && document.referrer.includes(window.location.host)) {
        window.history.back();
    } else {
        // 如果沒有來源頁面，回到首頁
        window.location.href = 'index.html';
    }
}

// 導航到指定頁面
function goToPage(page) {
    window.location.href = page;
}

// 更新點數統計
function updatePointsStats() {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    
    // 直接設定為指定的數值
    const monthlyEarned = 15000;
    const monthlyUsed = 1300;
    
    // 更新顯示
    const earnedElement = document.querySelector('.points-stat .val.earned');
    const usedElement = document.querySelector('.points-stat .val.used');
    
    if (earnedElement) {
        earnedElement.textContent = `+${monthlyEarned.toLocaleString()} 點`;
    }
    
    if (usedElement) {
        usedElement.textContent = `-${monthlyUsed.toLocaleString()} 點`;
    }
}

// 頁面載入完成後更新統計
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(updatePointsStats, 500);
});

// 觸控友善的滾動到頂部功能
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 雙擊頂部導航回到頂部
document.addEventListener('DOMContentLoaded', function() {
    const headerTitle = document.querySelector('.app-header .app-name');
    if (headerTitle) {
        headerTitle.addEventListener('dblclick', scrollToTop);
    }
});
