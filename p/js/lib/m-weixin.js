/**
 * @file m-weixin.js
 * author huangzongzhe
 * 2016.6
 */
/* eslint-disable fecs-camelcase */
(function () {
    // 微信的分享
    // 依赖http://res.wx.qq.com/open/js/jweixin-1.0.0.js
    function wxShare(options) {
        var jsApiListOpt = [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'
        ];
        wx.ready(function () {
            /* config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
                config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
                对于用户触发时才调用的接口，
                则可以直接调用，不需要放在ready函数中
            */
            // 检查微信是否支持
            wx.checkJsApi({
                jsApiList: jsApiListOpt, // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function (res) {
                    // 。。。。。这代码写出来好丑
                    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                    var title = options.titleName;
                    var link = location.href;
                    var imgUrl = options.image;
                    var desc = options.content;
                    if (res.checkResult.onMenuShareTimeline) {
                        // alert(6666);
                        wx.onMenuShareTimeline({
                            title: title, // 分享标题
                            link: link, // 分享链接
                            imgUrl: imgUrl, // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                // alert(1111);
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                    }
                    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                    if (res.checkResult.onMenuShareAppMessage) {
                        wx.onMenuShareAppMessage({
                            title: title, // 分享标题
                            desc: desc, // 分享描述
                            link: link, // 分享链接
                            imgUrl: imgUrl, // 分享图标
                            type: '', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                // alert(7771);
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                                // alert(7772);
                            }
                        });
                    }
                    // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
                    if (res.checkResult.onMenuShareQQ) {
                        wx.onMenuShareQQ({
                            title: title, // 分享标题
                            desc: desc, // 分享描述
                            link: link, // 分享链接
                            imgUrl: imgUrl, // 分享图标
                            success: function () {
                               // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                               // 用户取消分享后执行的回调函数
                            }
                        });
                    }
                    // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
                    if (res.checkResult.onMenuShareWeibo) {
                        wx.onMenuShareWeibo({
                            title: title, // 分享标题
                            desc: desc, // 分享描述
                            link: link, // 分享链接
                            imgUrl: imgUrl, // 分享图标
                            success: function () {
                               // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                    }
                    // 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
                    if (res.checkResult.onMenuShareQZone) {
                        wx.onMenuShareQZone({
                            title: title, // 分享标题
                            desc: desc, // 分享描述
                            link: link, // 分享链接
                            imgUrl: imgUrl, // 分享图标
                            success: function () {
                               // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                    }

                }
            });
            // 在config中debug: true就好了
            // wx.error(function (res) {
            //     alert(res.errMsg);
            // });
            // wx.hideOptionMenu();
        });
    }

    window.wxShare = wxShare;
    console.log('m-weixin')
})();
/* eslint-enable fecs-camelcase */
