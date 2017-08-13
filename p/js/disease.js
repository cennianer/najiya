$(function() {

    var articleId = Utils.parseUrlParams().search['articleId'];

    var ajaxUrls = {
        categoryList: '/category/list/disease',// 侧栏
        detail: '/category/detail/' , // 文章详情页 [注] ajaxUrls.detail + id
    }

    // 线下
    var ajaxUrls = {
        categoryList: '/mock/categoryListDisease.json',
        detail: '/mock/categoryDetailId.json',
    }


    // 侧栏数据
    function getDiseaseList() {
        var eleBox = $(".slide-box");
        var html = '';
        var diseaseIcon = {
                '肾病': 'shen',
                '胰腺炎': 'yixianyan',
                '自发性膀胱炎/FLUTD': 'pangguangyan',
                '炎性肠病/三体炎':'changbing',
                '糖尿病': 'tangniaobing',
                '其他': 'other-class',
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
                                oneClassHtml += '<li data-categoryId="' + leavesList[j].categoryId + '">' + leavesList[j].categoryName + '</li>';
                            }
                            if(oneClassHtml) {
                                oneClassHtml =
                                '<div class="classify-item-list none">'
                                  + '<div class="triggle-icon"></div>'
                                  + '<ul class="one-class-item">'
                                    + oneClassHtml
                                  + '</ul>'
                                + '</div>'
                            }
                        html +=
                        '<li class="classify classify-box">'
                            + '<div class="classify-title" data-categoryId="' + data[i].root.categoryId + '">'
                                + '<i class="classify-icon ' + diseaseIcon[data[i].root.categoryName] + '"></i>'
                                + '<span>' + data[i].root.categoryName + '</span>'
                                + '<i class="arrow-icon"></i>'
                            + '</div>'
                            + oneClassHtml
                        + '</li>';
                    }
                    // 加到页面
                    eleBox.append(html);
                    eleBox.on('click', 'li.classify .classify-title', function(e) {
                        // 三级类别显示
                        $(this).siblings(".classify-item-list").slideToggle();
                        console.log(e.target)
                    });
                    eleBox.on('click', '.classify-item-list .one-class-item li', function(e) {
                        // 三级类别点击
                        // $(this).siblings(".classify-item-list").slideToggle();
                        getCategoryContent($(this).data('categoryid'), function(html) {
                            $(".class-item-content").removeClass('none').html(html);
                        })
                        console.log($(this).data('categoryid'))
                    });
                }
            }
        });
    }



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
            var detailContentTab = $(".tab-relate-article li");
            $(".item-tab-list").on('click', 'li', function() {
                // tab 本身
                $(this).addClass('active').siblings().removeClass('active');
                // tab 对应的内容
                detailContentTab.removeClass('active');
                $(detailContentTab[$(this).index()]).addClass('active');
            });
        });
    }

    // 通过id获取文章详情内容
    function getCategoryContent(articleId, callback) {
        // var eleBox = $(".single-topic-box");
        var html = '';
        $.ajax({
            // url: ajaxUrls.detail + articleId,
            url: ajaxUrls.detail,
            success: function(res) {
                // res = JSON.parseJSON(res)
                if(+res.code == 1000) {
                    var data = res.data;
                    var title = data.categoryName ? '<h2 class="item-page-title">' + data.categoryName + '</h2>' : '';
                    html +=
                    '<div class="disease-desc article">'
                        + title
                        + data.xggn
                        // + '<p>关于猫咪的疾病防治我们应该如何做呢？</p>'
                    + '</div>'
                    + '<div class="item-tab-box">'
                        + '<div class="link-line"></div>'
                        + '<ul class="item-tab-list">'
                            + '<li class="active" data-detailName="blsl">病理生理</li>'
                            + '<li data-detailName="lcbx">临床表现</li>'
                            + '<li data-detailName="zd">诊断</li>'
                            + '<li data-detailName="zl">治疗</li>'
                            + '<li data-detailName="yh">预后</li>'
                            + '<li data-detailName="yf">预防</li>'
                            + '<li data-detailName="hlyd">护理要点</li>'
                        + '</ul>'
                    + '</div>'
                    + '<ul class="tab-relate-article">'
                        + '<li class="active">'
                          + '<div class="article">'
                              + data.blsl
                          + '</div>'
                        + '</li>'
                        + '<li>'
                          + '<div class="article">'
                              + data.lcbx
                          + '</div>'
                        + '</li>'
                        + '<li>'
                          + '<div class="article">'
                              + data.zd
                          + '</div>'
                        + '</li>'
                        + '<li>'
                          + '<div class="article">'
                              + data.zl
                          + '</div>'
                        + '</li>'
                        + '<li>'
                          + '<div class="article">'
                              + data.yh
                          + '</div>'
                        + '</li>'
                        + '<li>'
                          + '<div class="article">'
                              + data.yf
                          + '</div>'
                        + '</li>'
                        + '<li>'
                          + '<div class="article">'
                              + data.hlyd
                          + '</div>'
                        + '</li>'
                    + '</ul>';
                    // 加到页面
                    callback && callback(html);
                    // eleBox.append(html);
                }
            }
        });
    }


    function init() {
        defaultContent();
        getDiseaseList();
    }


    init();

})
