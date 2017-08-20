var Utils = {
    parseUrlParams: function(url) {
	    var a = document.createElement('a');
	    a.href = url || window.location.href;
	    return {
	      origin: a.origin,
	      protocol: a.protocol,
	      host: a.host,
	      hostname: a.hostname,
	      pathname: a.pathname,
	      search: _search(a.search),
	      hash: a.hash
	    };

	    function _search(str) {
	      if (!str) {
	        return {};
	      }
	      var ret = {};
	      str = str.slice(1).split('&');
	      for (var i = 0, arr; i < str.length; i++) {
	        arr = str[i].split('=');
	        ret[arr[0]] = decodeURIComponent(arr[1]);
	      }
	      return ret;
	    }
	  },
      device: function() {
          var ua = navigator.userAgent.toLowerCase(),
	      isIOS = !!/(iphone|ipad|ipod|ios)/.test(ua),
	      isAndroid = !!/(android)/.test(ua),
	      isWeixin = !!/micromessenger/.test(ua),
	      isWeibo = !!/weibo/.test(ua);

    	  return {
    	    isIOS: isIOS, //IDS.device.isIOS
    	    isAndroid: isAndroid, //IDS.device.isAndroid
    	    isWeixin: isWeixin, //IDS.device.isWeixin
    	    isWeibo: isWeibo, //IDS.device.isWeibo
    	  };
      },
      // IOS 微信下无法通过document.title修改title
	  setDocumentTitle: function(str) {
          var _self = this;
	      document.title = str;
	      if (_self.device.isIOS && _self.device.isWeixin) {
    	      //利用iframe的onload事件刷新页面
    	      var iframe = document.createElement('iframe');
    	      iframe.src = '/favicon.ico';
    	      iframe.style.display = 'none';
    	      iframe.onload = function () {
    	        setTimeout(function () {
    	          document.body.removeChild(iframe);
    	        }, 0);
    	      };
    	      document.body.appendChild(iframe);
         }
	 },
}
