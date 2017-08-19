var Utils = {
    parseUrlParams: function parseUrlParams(url) {
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
}
