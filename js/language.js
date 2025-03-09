// 语言切换功能
document.addEventListener('DOMContentLoaded', () => {
    // 默认语言
    let currentLanguage = localStorage.getItem('language') || 'zh';
    
    // 初始化语言
    applyLanguage(currentLanguage);
    
    // 添加语言切换器到右上角
    addLanguageSwitcher();
    
    // 初始化语言切换器状态
    updateLanguageSwitcherState(currentLanguage);
});

// 添加语言切换器
function addLanguageSwitcher() {
    // 创建语言切换器容器
    const langSwitcher = document.createElement('div');
    langSwitcher.className = 'language-switcher-topright';
    
    // 添加语言选项
    langSwitcher.innerHTML = `
        <div class="lang-options">
            <button type="button" class="lang-btn" data-lang="zh">中</button>
            <button type="button" class="lang-btn" data-lang="ja">日</button>
            <button type="button" class="lang-btn" data-lang="en">En</button>
        </div>
    `;
    
    // 将语言切换器添加到 body
    document.body.appendChild(langSwitcher);
    
    // 添加事件监听器
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
}

// 更新语言切换器的状态
function updateLanguageSwitcherState(lang) {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// 切换语言
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // 保存语言选择到本地存储
    localStorage.setItem('language', lang);
    
    // 应用新语言
    applyLanguage(lang);
    
    // 更新语言切换器状态
    updateLanguageSwitcherState(lang);
    
    // 触发语言变更事件
    document.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: lang } 
    }));
}

// 应用语言翻译
function applyLanguage(lang) {
    // 确保已加载翻译数据
    if (typeof translations === 'undefined') {
        console.error('Translations not loaded');
        return;
    }
    
    // 获取当前语言的翻译数据
    const texts = translations[lang];
    if (!texts) {
        console.error(`No translations found for language: ${lang}`);
        return;
    }
    
    // 更新所有具有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (texts[key]) {
            element.textContent = texts[key];
        }
    });
    
    // 更新页面标题
    updatePageTitle(lang);
    
    // 更新其他特定元素
    updateSpecificElements(lang);
}

// 更新页面标题
function updatePageTitle(lang) {
    const path = window.location.pathname;
    let title = '';
    
    if (path.includes('index.html') || path.endsWith('/')) {
        title = `Du Yuhan - ${translations[lang].role}`;
    } else if (path.includes('resume.html')) {
        title = `${translations[lang].about_me} - Du Yuhan`;
    } else if (path.includes('projects.html')) {
        title = `${translations[lang].nav_projects} - Du Yuhan`;
    }
    
    if (title) {
        document.title = title;
    }
}

// 更新特定元素
function updateSpecificElements(lang) {
    const texts = translations[lang];
    
    // 侧边栏信息
    const roleElement = document.querySelector('.sidebar-header p');
    if (roleElement) {
        roleElement.textContent = texts.role;
    }
} 