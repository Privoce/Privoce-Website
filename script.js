let parts = ["home", "overall", "committee", "breakdown", "sponsor", "faq", "register"];
let displayScrollTop = false;
let sectionPosition = 0;

// 计算主页元素垂直间距
function updateVerticalPadding() {
    let spareHeight = document.body.clientHeight
        - $("section .c-main-logo").height()
        - $("section .c-main-description").height()
        - $("section .borderless.menu").height();
    $(".c-logo-padding").height(spareHeight * 0.33);
    $(".c-description-padding").height(spareHeight * 0.14);
    $(".c-main-menu-padding").height(spareHeight * 0.07);
}

// 计算所在区块
function calcPartPosition() {
    // 默认宽屏，不检测注册部分
    let m = 6;
    if (document.body.clientWidth <= 768) {
        // 手机需要检测注册部分
        m = 7;
    }
    for (let i = 1; i < m; i++) {
        if ($(`#${parts[i]}`).visible(true)) {
            return i;
        }
    }
    return 0;
}

// 高亮所在区块
function updatePartPosition(p) {
    $(".borderless.menu .c-desktop-only.item").removeClass("active");
    $(".vertical.sidebar > .item:not(.header)").removeClass("active");
    if (p !== 0) {
        $(`.n-${parts[p]}:not(.icon):not(.button)`).addClass("active");
    }
}

$(document).ready(function () {
    // 主菜单吸附
    $(".borderless.menu").visibility({
        type: "fixed"
    });
    // 侧边菜单展开
    $(".ui.sidebar").sidebar("attach events", ".c-sidebar-toggle");
    // 初始化可折叠文本框
    $('.ui.accordion').accordion();
    // 导航项目滚动动画
    for (let i = 0; i < parts.length; i++) {
        $(`.n-${parts[i]}`).click(function () {
            $([document.documentElement, document.body]).animate({
                scrollTop: $(`#${parts[i]}`).offset().top - 80
            }, 'normal');
            $(".pusher").click();
        });
    }
    // 计算主页元素垂直间距
    updateVerticalPadding();
});

// 监听窗口滚动
$(window).scroll(function () {
    if (document.documentElement.scrollTop + document.body.scrollTop > document.body.clientHeight) {
        // 显示顶部按钮
        if (!displayScrollTop) {
            // 还没显示，触发动画
            $(".ui.circular.icon.button.n-home").animate({right: "1rem"}, 600);
        }
        displayScrollTop = true;
    } else {
        if (displayScrollTop) {
            // 正在显示，触发动画
            $(".ui.circular.icon.button.n-home").animate({right: "-5rem"}, 600);
        }
        displayScrollTop = false;
    }
    // 刷新菜单高亮项
    let t = calcPartPosition();
    if (t !== sectionPosition) {
        updatePartPosition(t);
        sectionPosition = t;
    }
});
