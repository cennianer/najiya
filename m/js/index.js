$(function() {

    var ajaxUrls = {
        bannerList: '/banner/list',//首页banner
        bannerSingleTopic: '/banner/singleTopic', //一个专题
        bannerArticle: '/banner/article', // 3个文章
        bannerTopics: '/banner/topics', //6个专题
    }

    // 线下
    // var ajaxUrls = {
    //     bannerList: '/mock/bannerList.json',//首页banner
    //     bannerSingleTopic: '/mock/bannerSingleTopic.json', //一个专题
    //     bannerArticle: '/mock/bannerArticle.json', // 3个文章
    //     bannerTopics: '/mock/bannerTopics.json', //6个专题
    // }


    // banner位
    function getBannerList() {
        var eleBox = $(".banner-box");
        var html = '';
        $.ajax({
            url: ajaxUrls.bannerList,
            success: function(res) {
                if(+res.code == 1000) {
                    var data = res.data && res.data.banner;
                    var dataLen = data && data.length;

                    for(var i = 0; i < dataLen; i++) {
                        var num = i < 9 ? ('0' + (i+1)) : (i+1);
                        html +=
                        '<a href="' + data[i].jumpUrl + '"><div class="swiper-slide">'
                            + '<div class="banner-img" style="background-image: url(' + data[i].image + ')"></div>'
                            + '<div class="banner-content">'
                                + '<span class="num">' + num + '</span>'
                                + '<p class="profession">profession</p>'
                                + '<h2 class="title">' + data[i].title + '</h2>'
                                + '<p class="desc">' + data[i].describe + '</p>'
                                + '<a href="' + data[i].jumpUrl + '""><div class="banner-but">详细介绍</div></a>'
                            + '</div>'
                        + '</div></a>';
                    }
                    // 加到页面
                    eleBox.append(html);
                    var bannerSwiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        // paginationClickable: true,
                        // nextButton: '.swiper-button-next',
                        // prevButton: '.swiper-button-prev',
                        spaceBetween: 30,
                        centeredSlides: true,
                        autoplay: 2500,
                        autoplayDisableOnInteraction: false
                    });
                }
            }
        });
    }

    // 单条研究
    function getSingleTopic() {
        var eleBox = $(".single-topic-box");
        var html = '';
        $.ajax({
            url: ajaxUrls.bannerSingleTopic,
            success: function(res) {
                if(+res.code == 1000) {
                    var data = res.data && res.data.singleTopic;
                    var dataLen = data && data.length;

                    for(var i = 0; i < dataLen; i++) {
                        html +=
                          '<h1 class="disease-title">' + data[i].title + '</h1>'
                        + '<p class="desc">' + data[i].describe + '</p>'
                        + '<a href="' + data[i].jumpUrl + '"><p class="more">了解详情</p></a>';
                    }
                    // 加到页面
                    eleBox.append(html);
                }
            }
        });
    }

    // 3个内容
    function getArticle() {
        var eleBox = $(".disease-list");
        var html = '';
        $.ajax({
            url: ajaxUrls.bannerArticle,
            success: function(res) {
                if(+res.code == 1000) {
                    var data = res.data && res.data.articles;
                    var dataLen = data && data.length;

                    for(var i = 0; i < dataLen; i++) {
                        var relatedHtml = '';
                        var relatedList = data[i].articleList, relatedListLen = relatedList && relatedList.length;
                        if(relatedList && relatedListLen > 0) {
                            for(var j = 0; j < relatedListLen; j++) {
                                // todo category(疾病、养护) 还是 article(专题)
                                relatedHtml += '<a href="./instituteDesc.html?articleId=' + relatedList[j].articleId + '"><li class="toe">' + relatedList[j].title + '</li></a>';
                            }
                        }

                        html +=
                        '<li class="disease-item">'
                            + '<a href="' + data[i].jumpUrl + '"><div class="disease-item-head" style="background-image: url(' + data[i].image + ')"></div></a>'
                            + '<a href="' + data[i].jumpUrl + '"><h2 class="item-title">' + data[i].title + '</h2></a>'
                            + '<a href="' + data[i].jumpUrl + '"><p class="item-desc toe3">' + data[i].describe + '</p></a>'
                            + '<a href="' + data[i].jumpUrl + '" class="item-desc-more">查看详情</a>'
                            + '<ul class="disease-related-list">'
                                + relatedHtml
                            + '</ul>'
                        + '</li>';
                    }
                    // 加到页面
                    eleBox.append(html);
                }
            }
        });
    }

    // 专项研究
    function getTopics() {
        var eleBox = $(".institute-list");
        var html = '';
        $.ajax({
            url: ajaxUrls.bannerTopics,
            success: function(res) {
                if(+res.code == 1000) {
                    var data = res.data && res.data.topics;
                    var dataLen = data && data.length;

                    for(var i = 0; i < dataLen; i++) {
                        var bigClass = (i % 4) == 0 ? 'class="big-width"' : '';
                        html +=
                        '<li ' + bigClass + '>'
                            + '<a href="' + data[i].jumpUrl + '">'
                                + '<div class="item-img" style="' + data[i].image + '"></div>'
                                + '<div class="cover-box">'
                                    + '<div class="des-box">'
                                      + '<h3 class="item-title">' + data[i].title + '</h3>'
                                      + '<p class="item-desc">' + data[i].describe + '</p>'
                                      + '<div class="item-more-icon"></div>'
                                    + '</div>'
                              + '</div>'
                          + '</a>'
                        + '</li>';
                    }
                    if(html){
                        $(".institute-title").removeClass('none');
                    }
                    // 加到页面
                    eleBox.append(html);
                }
            }
        });
    }

    function init() {
        getBannerList();
        getSingleTopic();
        getArticle();
        getTopics();
    }


    init();
})
