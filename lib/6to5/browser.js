// this is gross but it monkey patches in behaviour required by `depd` used by
// `ast-types`
Error.captureStackTrace = Error.captureStackTrace || function (obj) {
  if (Error.prepareStackTrace) {
    var frame = {
      isEval: function () { return false; },
      getFileName: function () { return "filename"; },
      getLineNumber: function () { return 1; },
      getColumnNumber: function () { return 1; },
      getFunctionName: function () { return "functionName"; }
    };

    obj.stack = Error.prepareStackTrace(obj, [frame, frame, frame]);
  } else {
    obj.stack = obj.stack || obj.name || "Error";
  }
};

var transform = module.exports = require("./transformation/transform");

transform.transform = transform;

transform.eval = function (code, opts) {
  opts = opts || {};
  opts.filename = opts.filename || "eval";
  opts.sourceMap = "inline";
  return eval(transform(code, opts).code);
};

transform.run = function (code, opts) {
  opts = opts || {};
  opts.sourceMap = "inline";
  return new Function(transform(code, opts).code)();
};

transform.load = function (url, callback, opts, hold) {
  opts = opts || {};
  opts.filename = opts.filename || url;

  var xhr = window.ActiveXObject ? new window.ActiveXObject("Microsoft.XMLHTTP") : new window.XMLHttpRequest();
  xhr.open("GET", url, true);
  if ("overrideMimeType" in xhr) xhr.overrideMimeType("text/plain");

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;

    var status = xhr.status;
    if (status === 0 || status === 200) {
      var param = [xhr.responseText, opts];
      if (!hold) transform.run.apply(transform, param);
      if (callback) callback(param);
    } else {
      throw new Error("Could not load " + url);
    }
  };

  xhr.send(null);
};

var runScripts = function () {
  var scripts = [];
  var types   = ["text/ecmascript-6", "text/6to5"];
  var index   = 0;

  var exec = function () {
    var param = scripts[index];
    if (param instanceof Array) {
      transform.run.apply(transform, param);
      index++;
      exec();
    }
  };

  var run = function (script, i) {
    var opts = {};

    if (script.src) {
      transform.load(script.src, function (param) {
        scripts[i] = param;
        exec();
      }, opts, true);
    } else {
      opts.filename = "embedded";
      scripts[i] = [script.innerHTML, opts];
    }
  };

  var _scripts = window.document.getElementsByTagName("script");
  for (var i in _scripts) {
    var _script = _scripts[i];
    if (types.indexOf(_script.type) >= 0) scripts.push(_script);
  }

  for (i in scripts) {
    run(scripts[i], i);
  }

  exec();
};

if (window.addEventListener) {
  window.addEventListener("DOMContentLoaded", runScripts, false);
} else {
  window.attachEvent("onload", runScripts);
}
