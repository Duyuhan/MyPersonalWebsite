// 加载侧边栏
document.addEventListener('DOMContentLoaded', () => {
    // 使用 XMLHttpRequest 代替 fetch，它在某些浏览器的文件协议下有更好的兼容性
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'components/sidebar.html', true);
    
    xhr.onload = function() {
        if (this.status === 200) {
            // 插入侧边栏
            document.body.insertAdjacentHTML('afterbegin', this.responseText);
            
            // 设置当前页面的导航项为激活状态
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navId = `nav-${currentPage.replace('.html', '')}`;
            const navItem = document.getElementById(navId);
            if (navItem) {
                navItem.classList.add('active');
            }
        } else {
            console.error('Error loading sidebar: Status ' + this.status);
        }
    };
    
    xhr.onerror = function() {
        console.error('Error loading sidebar: Network Error');
    };
    
    xhr.send();
}); 