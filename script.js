let parts = ["home", "mission", "overview", "approach", "feature", "team", "join"];
let displayScrollTop = false;
let sectionPosition = 0;

// 计算所在区块
function calcPartPosition() {
    for (let i = 1; i < parts.length; i++) {
        if ($(`#${parts[i]}`).visible(true)) {
            return i;
        }
    }
    return 0;
}

// 高亮所在区块
function updatePartPosition(p) {
    $(".menu .item").removeClass("active");
    if (p !== 0) {
        $(`.n-${parts[p]}.item:not(.header)`).addClass("active");
    }
}

// 监听窗口滚动
$(window).scroll(function () {
    if (document.documentElement.scrollTop + document.body.scrollTop > 720) {
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

$(document).ready(function () {
    // 主菜单吸附
    $('.masthead').visibility({
        once: false,
        onBottomPassed: function () {
            $('.fixed.menu').transition('fade in');
        },
        onBottomPassedReverse: function () {
            $('.fixed.menu').transition('fade out');
        }
    });

    // 侧边菜单展开
    $(".ui.sidebar").sidebar("attach events", ".sidebar-toggle");

    // 导航项目滚动动画
    for (let i = 0; i < parts.length; i++) {
        $(`.n-${parts[i]}`).click(function () {
            $([document.documentElement, document.body]).animate({
                scrollTop: $(`#${parts[i]}`).offset().top - 80
            }, 'normal');
            $(".pusher").click();
        });
    }

    // 防止图片拖动
    $('img').on('dragstart', () => false);

    // 下拉菜单
    $('.ui.dropdown').dropdown();
});
