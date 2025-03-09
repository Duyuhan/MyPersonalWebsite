// 导航栏响应式处理
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // 如果导航菜单是展开的，点击后关闭它
            navLinks.classList.remove('active');
        }
    });
});

// 导航栏滚动效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // 向下滚动
        navbar.style.transform = 'translateY(-100%)';
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // 向上滚动
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// 激活当前部分的导航链接
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// 等待页面加载完成后执行的函数
document.addEventListener('DOMContentLoaded', function() {
    // 创建菜单切换按钮（移动设备）
    createMenuToggle();
    
    // 添加页面滚动动画
    animateOnScroll();
    
    // 处理语言变更后的事件
    document.addEventListener('languageChanged', function(e) {
        // 在语言切换后可能需要重新初始化一些功能
        const lang = e.detail.language;
        console.log(`Language changed to: ${lang}`);
    });
});

// 创建菜单切换按钮，用于移动设备显示/隐藏侧边栏
const createMenuToggle = () => {
    // 判断是否已经存在按钮
    if (!document.querySelector('.menu-toggle')) {
        // 创建按钮
        const menuButton = document.createElement('button');
        menuButton.className = 'menu-toggle';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.appendChild(menuButton);
        
        // 添加点击事件
        menuButton.addEventListener('click', () => {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('active');
            
            // 更新按钮图标
            const icon = menuButton.querySelector('i');
            if (sidebar.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }
};

// 点击主内容区域时关闭侧边栏
document.querySelector('.main-content').addEventListener('click', () => {
    if (window.innerWidth <= 1024 && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
});

// 页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('.main-content');
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        mainContent.style.transition = 'all 0.8s ease';
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';
    }, 100);
});

// 打字机效果
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.innerHTML;
    typingText.innerHTML = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            typingText.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// 添加页面滚动动画
const animateOnScroll = () => {
    // 获取所有需要动画的元素
    const animatedElements = document.querySelectorAll('.skill-card, .stat-card, .timeline-item, .certificate-card');
    
    // 检查元素是否在视窗内
    const checkInView = () => {
        animatedElements.forEach(element => {
            // 获取元素的位置信息
            const rect = element.getBoundingClientRect();
            const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
            
            // 如果元素在视窗内
            if (rect.top >= 0 && rect.top <= viewHeight * 0.75) {
                element.classList.add('animated');
            }
        });
    };
    
    // 初始检查和滚动时检查
    checkInView();
    window.addEventListener('scroll', checkInView);
};

// 页面加载完成后加载 GitHub 统计信息
document.addEventListener('DOMContentLoaded', loadGitHubStats);

// 确保侧边栏和主内容区域的滚动正确同步
document.addEventListener('DOMContentLoaded', function() {
    // 处理侧边栏嵌套滚动
    const sidebar = document.querySelector('.sidebar');
    const sidebarContent = document.querySelector('.sidebar-content-wrapper');
    
    if (sidebar && sidebarContent) {
        // 同步侧边栏高度
        function updateSidebarHeight() {
            const viewportHeight = window.innerHeight;
            sidebar.style.height = `${viewportHeight}px`;
        }
        
        // 初始更新和窗口大小变化时更新
        updateSidebarHeight();
        window.addEventListener('resize', updateSidebarHeight);
    }
    
    // 处理主内容区域嵌套滚动
    const mainContent = document.querySelector('.main-content');
    const mainContentInner = document.querySelector('.main-content-inner');
    
    if (mainContent && mainContentInner) {
        // 监听主内容区域的大小变化
        function updateMainContentHeight() {
            const mainContentWrapper = document.querySelector('.main-content-wrapper');
            if (mainContentWrapper) {
                // 设置包装器的高度以适应内容
                const contentHeight = mainContentInner.scrollHeight;
                mainContentWrapper.style.height = `${contentHeight}px`;
            }
        }
        
        // 初始更新
        updateMainContentHeight();
        
        // 创建一个 ResizeObserver 来监视内容变化
        if (typeof ResizeObserver !== 'undefined') {
            const resizeObserver = new ResizeObserver(() => {
                updateMainContentHeight();
            });
            
            resizeObserver.observe(mainContentInner);
        } else {
            // 回退方案：定期检查大小变化
            window.addEventListener('resize', updateMainContentHeight);
            setInterval(updateMainContentHeight, 1000);
        }
    }
    
    // 处理移动设备交互，确保滚动行为正常
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
});

// GitHub 统计数据加载函数 - 仅在 GitHub 页面使用
async function loadGitHubStats() {
    if (!window.location.pathname.includes('github.html')) return;
    
    try {
        // 此处可添加实际的 GitHub API 调用
        // 由于没有实际的 API 密钥，此处仅为示例
        console.log('GitHub stats would be loaded here if API was connected');
        
        // 模拟数据加载
        setTimeout(() => {
            const reposContainer = document.querySelector('.repos-grid');
            if (reposContainer) {
                // 添加模拟的仓库数据
                for (let i = 0; i < 4; i++) {
                    const repoCard = document.createElement('div');
                    repoCard.className = 'repo-card bg-secondary p-5 rounded-xl shadow-md hover:shadow-lg transition-all';
                    
                    repoCard.innerHTML = `
                        <h3 class="text-lg font-semibold mb-2">Example Repository ${i+1}</h3>
                        <p class="text-gray-400 mb-3">This is a sample repository description. In a real app, this would be loaded from GitHub API.</p>
                        <div class="repo-stats flex items-center gap-4 text-sm text-gray-400">
                            <span><i class="fas fa-star mr-1 text-yellow-500"></i> ${Math.floor(Math.random() * 100)}</span>
                            <span><i class="fas fa-code-branch mr-1 text-accent"></i> ${Math.floor(Math.random() * 50)}</span>
                        </div>
                    `;
                    
                    reposContainer.appendChild(repoCard);
                }
            }
        }, 1000);
        
    } catch (error) {
        console.error('Error loading GitHub stats:', error);
    }
} 