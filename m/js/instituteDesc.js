$(function() {
    FastClick.attach(document.body);
    var articleId = Utils.parseUrlParams().search['articleId'];

    var ajaxUrls = {
        articleDetail: '/article/{id}/detail',// 详情
        categoryTopics: '/category/topics', // 侧栏专题列表
        articleList: '/category/{id}/articleList' // 侧栏推荐
     }
    // 线下
    // var ajaxUrls = {
    //     articleDetail: '/mock/articleDetail.json',
    //     categoryTopics: '/mock/categoryListByType.json', // 侧栏专题列表
    //     articleList: '/mock/articleDisease.json'
    // }

    function add0(m){return m<10?'0'+m:m }
    function format(shijianchuo) {
        //shijianchuo是整数，否则要parseInt转换
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm);
    }

    // 文章详情
    function getArticleDetail(id) {
        id = id || articleId;
        var url = ajaxUrls.articleDetail.replace(/{id}/, id);
        $.ajax({
            url: url,
            success: function(res) {
                if(+res.code == 1000) {
                    var data = res.data.detail;
                    var contentBox = $(".default-content");
                    var title = data.title ? '<h1 class="article-title">' + data.title + '</h1>' : '';
                    var time = data.created ? '<span class="article-time">' + format(data.created) + '</span>' : '';
                    var source = data.source ? '<span class="article-source">来源：' + data.source + '</span>' : '';
                    var timeORsource = time || source ?
                        '<div class="article-time-and-source">'
                            + time
                            + source
                        + '</div>' : '';

                    var contentHtml =
                        '<div class="article-title-box">'
                            + title
                            + timeORsource
                        + '</div>'
                        + '<div class="article">' + data.content + '</div>';
                    Utils.setDocumentTitle( data.title + '_专题研究_猫研所');
                    contentBox.html(contentHtml);

                }
            }
        });
    }

    // 侧栏文章列表
    function getSildeArticleList() {
        var url = ajaxUrls.categoryTopics.replace(/{id}/, articleId);
        $.ajax({
            url: url,
            success: function(res) {
                if(+res.code == 1000) {
                    var data = res.data.list || [];
                    var zhuantiListBox = $(".institute-list-box");
                    var itemAll = '';
                    for(var i = 0, l = data.length; i < l; i++) {
                        itemAll += '<li data-id="' + data[i].categoryId + '">' + data[i].categoryName + '</li>';
                    }
                    if(data.length > 0) {
                        var zhuantiListHtml =
                            '<h2>专题研究</h2>'
                            + '<ul class="institute-list">'
                                + itemAll
                            + '</ul>';
                        zhuantiListBox.prepend($(zhuantiListHtml));
                        zhuantiListBox.find(".institute-list").on('click', 'li', function() {
                            $(this).addClass('active').siblings('li').removeClass('active');
                            getArticleDetail($(this).attr("data-id"));
                        });
                    }else {
                        zhuantiListBox.addClass('none');
                    }

                }
            }
        });
    }

    // 侧栏推荐(相关文章)
    function getSideTuijian() {
        var url = ajaxUrls.articleList.replace(/{id}/, articleId);
        $.ajax({
            url: url,
            success: function(res) {
                if(+res.code == 1000) {
                    var data = res.data.articles || [];
                    var xiangguanListBox = $(".relative-article-box");
                    var xiangguanItemAll = '';
                    for(var i = 0, l = data.length; i < l; i++) {
                        xiangguanItemAll += '<a href="instituteDesc.html?articleId=' + data[i].articleId + '"><li class="toe">' + data[i].title + '</li></a>'
                    }

                    if(data.length > 0) {
                        var xiangguan =
                            '<h2>相关文章</h2>'
                            + '<ul>'
                              + xiangguanItemAll
                            + '</ul>';
                        xiangguanListBox.html($(xiangguan));
                    } else {
                        xiangguanListBox.addClass('none')
                    }

                }
            }
        });
    }



    getArticleDetail();
    // 侧栏
    getSildeArticleList();
    getSideTuijian();
});
