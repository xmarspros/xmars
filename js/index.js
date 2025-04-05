(function () {
  var r = new RegExp("(^|(.*?\\/))(index.js)(\\?|$)"),
    s = document.getElementsByTagName("script"),
    targetScript;
  for (var i = 0; i < s.length; i++) {
    var src = s[i].getAttribute("src");
    if (src) {
      var m = src.match(r);
      if (m) {
        targetScript = s[i];
        break;
      }
    }
  }

  var cacheVersion = Date.parse(new Date());

  var cssExpr = new RegExp("\\.css");

  function inputLibs(list) {
    if (list == null || list.length == 0) return;

    for (var i = 0, len = list.length; i < len; i++) {
      var url = list[i];
      if (cssExpr.test(url)) {
        var css = '<link rel="stylesheet" href="' + url + "?time=" + cacheVersion + '">';
        document.writeln(css);
      } else {
        var script = '<script type="text/javascript" src="' + url + "?time=" + cacheVersion + '"><' + "/script>";
        document.writeln(script);
      }
    }
  }

  function load() {
    var arrInclude = (targetScript.getAttribute("include") || "").split(",");
    var libpath = targetScript.getAttribute("libpath") || "";
    if (libpath.lastIndexOf("/") != libpath.length - 1) libpath += "/";

    var libsConfig = {
      IncludeXdog: [
        libpath + "js/balance_release.js",
        libpath + "js/g_tip_release.js",
        libpath + "js/xmars_release.js",
      ],
    };

    for (var i in arrInclude) {
      var key = arrInclude[i];
      inputLibs(libsConfig[key]);
    }
  }
  load();
})();
