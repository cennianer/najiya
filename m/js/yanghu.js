$(function() {
    FastClick.attach(document.body);
    var articleId = Utils.parseUrlParams().search['articleId'];

    var ajaxUrls = {
        categoryList: '/category/list/yanghu',// 侧栏
        detail: '/category/detail/{id}', // 文章详情页 [注] ajaxUrls.detail + id
        InstiteteRelative: '/article/yanghu' //专题推荐
    }

    // 线下
    // var ajaxUrls = {
    //     categoryList: '/mock/categoryListDisease.json',
    //     detail: '/mock/categoryDetailId.json',
    //     InstiteteRelative: '/mock/articleDisease.json'
    // }

    // 内容--默认: 没有id时 是二级页面默认内容， 有id时 是此id详情页面内容
    function defaultContent() {
        var contentBox = $(".content-box"); //内容容器
        if(!articleId && articleId !== 0) { // 二级页面默认内容 default-content 显示
            $(".default-content").removeClass('none');
            return;
        }

        var detailContent = $(".class-item-content");
        getCategoryContent(articleId, function(html) {
            // 文章详情内容容器
            detailContent.removeClass('none').html(html);
        });
    }

    // 侧栏数据
    function getDiseaseList() {
        var eleBox = $(".slide-box");
        var html = '';
        var diseaseIcon = {
                '疾病相关行为学': 'shen'
            };
        $.ajax({
            url: ajaxUrls.categoryList,
            success: function(res) {
                if(+res.code == 1000) {
                    var data = res.data && res.data.list;
                    var dataLen = data && data.length;

                    for(var i = 0; i < dataLen; i++) {
                        var leavesList = data[i].leaves,
                            leavesListLen = leavesList && leavesList.length,
                            oneClassHtml = '';
                            for(var j = 0; j < leavesListLen; j++) {
                                oneClassHtml += '<li class="one-class-item" data-categoryId="' + leavesList[j].categoryId + '">' + leavesList[j].categoryName + '</li>';
                            }
                            if(oneClassHtml) {
                                oneClassHtml =
                                '<ul class="classify-item">'
                                    + oneClassHtml
                                + '</ul>';
                            }
                        html +=
                        '<li class="classify">'
                            + '<p data-categoryId="' + data[i].root.categoryId + '" class="classify-title ' + diseaseIcon[data[i].root.categoryName] + '">' + data[i].root.categoryName + '</p>'
                            + oneClassHtml
                        + '</li>';
                    }
                    // 加到页面
                    eleBox.append(html);

                    var $classifyBut = $(".classify-but");
                    var classifyCloseClass = 'close-but';
                    var $classifyCover = $(".cover-classify-content");
                    eleBox.on('click', '.classify .classify-item .one-class-item', function() {
                        $classifyCover.addClass('none');
                        $classifyBut.removeClass('close-but');
                        eleBox.slideUp();
                        getCategoryContent($(this).data('categoryid'), function(html) {
                            $(".default-content").addClass('none');
                            $(".class-item-content").removeClass('none').html(html);
                        })
                    });
                    eleBox.on('click', '.classify-title', function(e) {
                        // 三级类别点击
                        $classifyCover.addClass('none');
                        $classifyBut.removeClass('close-but');
                        eleBox.slideUp();
                        $(this).siblings(".classify-item-list").slideToggle();
                        getCategoryContent($(this).data('categoryid'), function(html) {
                            $(".default-content").addClass('none');
                            $(".class-item-content").removeClass('none').html(html);
                        })
                    });
                }
            }
        });
    }

    // 通过id获取文章详情内容
    function getCategoryContent(articleId, callback) {
        // var eleBox = $(".single-topic-box");
        var html = '';
        $.ajax({
            url: ajaxUrls.detail.replace(/{id}/, articleId),
            success: function(res) {
                // res = JSON.parseJSON(res)
                if(+res.code == 1000) {
                    var data = res.data;
                    var title = data.categoryName ? '<h2 class="item-page-title">' + data.categoryName + '</h2>' : '';
                    var slideBLSL = '', slideLCBX = '', slideZD = '', slideZL = '', slideYH = '', slideYF = '', slideHLYD = '';
                    var contentBLSL = '', contentLCBX = '', contentZD = '', contentZL = '', contentYH = '', contentYF = '', contentHLYD = '';
                    // 病理生理
                    if(data.blsl) {
                        slideBLSL = '<li class="active swiper-slide page-swiper-slide swiper-slide-active">病理生理</li>';
                        contentBLSL =
                            '<li class="active">'
                              + '<div class="article">'
                                  + data.blsl
                              + '</div>'
                            + '</li>';
                    }
                    // 临床表现
                    if(data.lcbx) {
                        slideLCBX = '<li class="swiper-slide page-swiper-slide swiper-slide-next">临床表现</li>';
                        contentLCBX =
                            '<li>'
                              + '<div class="article">'
                                  + data.lcbx
                              + '</div>'
                            + '</li>';
                    }
                    // 诊断
                    if(data.zd) {
                        slideZD = '<li class="swiper-slide page-swiper-slide swiper-slide-next">诊断</li>';
                        contentZD =
                            '<li>'
                             + '<div class="article">'
                                 + data.zd
                             + '</div>'
                           + '</li>';
                    }
                    // 治疗
                    if(data.zl) {
                        slideZL = '<li class="swiper-slide page-swiper-slide swiper-slide-next">治疗</li>';
                        contentZL =
                            '<li>'
                              + '<div class="article">'
                                  + data.zl
                              + '</div>'
                            + '</li>';
                    }
                    // 预后
                    if(data.yh) {
                        slideYH = '<li class="swiper-slide page-swiper-slide swiper-slide-next">预后</li>';
                        contentYH =
                            '<li>'
                              + '<div class="article">'
                                  + data.yh
                              + '</div>'
                            + '</li>'
                    }
                    // 预防
                    if(data.yf) {
                        slideYF = '<li class="swiper-slide page-swiper-slide swiper-slide-next">预防</li>';
                        contentYF =
                            '<li>'
                              + '<div class="article">'
                                  + data.yf
                              + '</div>'
                            + '</li>'
                    }
                    // 护理要点
                    if(data.hlyd) {
                        slideHLYD = '<li class="swiper-slide page-swiper-slide swiper-slide-next">护理要点</li>';
                        contentHLYD =
                            '<li>'
                              + '<div class="article">'
                                  + data.hlyd
                              + '</div>'
                            + '</li>'
                    }

                    html +=
                    '<div class="disease-desc article">'
                        + title
                        + data.xggn
                        // + '<p>关于猫咪的疾病防治我们应该如何做呢？</p>'
                    + '</div>'
                    + '<div class="item-tab-box rank-both-box swiper-container-wrap">'
                        + '<div class="swiper-container page-swiper-container swiper-container-horizontal swiper-container-free-mode">'
                            + '<div class="link-line"></div>'
                            + '<ul class="item-tab-list swiper-wrapper page-swiper-wrapper">'
                                + slideBLSL
                                + slideLCBX
                                + slideZD
                                + slideZL
                                + slideYH
                                + slideYF
                                + slideHLYD
                            + '</ul>'
                        + '</div>'
                    + '</div>'
                    + '<ul class="tab-relate-article">'
                        + contentBLSL
                        + contentLCBX
                        + contentZD
                        + contentZL
                        + contentYH
                        + contentYF
                        + contentHLYD
                    + '</ul>';
                    // 加到页面
                    callback && callback(html);
                    var prizeSwiper = new Swiper('.page-swiper-container', {
                          //pagination: '.swiper-pagination',
                          slidesPerView: 3.5,
                          paginationClickable: true,
                          spaceBetween: 20,
                          freeMode: true
                      });
                    // 绑定tab切换事件
                    var detailContentTab = $(".tab-relate-article li");
                    $(".item-tab-list").on('click', 'li', function() {
                        // tab 本身
                        $(this).addClass('active').siblings().removeClass('active');
                        // tab 对应的内容
                        detailContentTab.removeClass('active');
                        $(detailContentTab[$(this).index()]).addClass('active');
                    });
                }
            }
        });
    }

    // 专题推荐
    function getInstiteteRelative() {
        $.ajax({
            url: ajaxUrls.InstiteteRelative,
            success: function(res) {
                if(+res.code == 1000) {
                    var data = res.data.articles || [];
                    var relativeInstitute = $(".relative-institute");
                    var relativeItemAll = '<ul class="institute-list">';
                    var href = './yanghu.html';
                    for(var i = 0, l = data.length; i < l; i++) {
                        relativeItemAll += '<a href="instituteDesc.html?articleId=' + data[i].articleId + '"><li class="item-text toe">' + data[i].title + '</li></a>';
                    }
                    relativeItemAll += '</ul>';
                    if(data.length > 0) {
                        var relativeInstituteHtml =
                            '<h3 class="relative-institute-title">猫研所专题研究</h3>'
                                + relativeItemAll ;
                        relativeInstitute.html($(relativeInstituteHtml));
                    }else {
                        relativeInstitute.addClass('none')
                    }
                }else {
                    alert(res.data.message)
                }
            }
        })
    }

    function init() {
        defaultContent();
        getDiseaseList();
        getInstiteteRelative();

        var $classifyBut = $(".classify-but");
        var classifyCloseClass = 'close-but';
        var $classifyCover = $(".cover-classify-content");
        var $classifyList = $(".classify-list");

        $classifyBut.on('click', function() {
            $(this).toggleClass(classifyCloseClass)
            $classifyCover.toggleClass('none');
            $classifyList.slideToggle();
        })
        $classifyCover.on('click', function() {
          $classifyCover.addClass('none');
          $classifyBut.removeClass(classifyCloseClass);
          $classifyList.slideUp();
        })

        //   var  itemTabList = $(".item-tab-list");
        //   itemTabList.on('click', 'li', function(item, i) {
        //       console.log($(this).index())
        //   })

        // 分类tab 按钮
        // 分类/cover

    }


    init();

})
