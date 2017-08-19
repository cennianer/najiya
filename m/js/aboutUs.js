$(function() {
    var slideBox = $(".aboutus-nav");
    var contentBox = $(".content-box li");
    var tab = Utils.parseUrlParams().search['tab'] || 0;

    function defaultShowContent() {
        slideBox.find('.classify').eq(tab).addClass('active').siblings('li').removeClass('active');
        contentBox.removeClass('active');
        $(contentBox[tab]).addClass('active');
        if(tab == 1) {
            $(".nav li").removeClass('active').eq(4).addClass('active')
        }
    }

    defaultShowContent();


    slideBox.on('click', '.classify', function() {
        // 侧栏本身
        $(this).addClass('active').siblings().removeClass('active');
        // 侧栏对应的内容展示
        contentBox.removeClass('active');
        $(contentBox[$(this).index()]).addClass('active');
    })
})
