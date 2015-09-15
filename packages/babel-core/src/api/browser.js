/* eslint no-new-func: 0 */

import { transform } from "./node";
export * from "./node";

export function run(code, opts = {}) {
  return new Function(transform(code, opts).code)();
}

export function load(url, callback, opts = {}, hold) {
  opts.filename = opts.filename || url;

  var xhr = global.ActiveXObject ? new global.ActiveXObject("Microsoft.XMLHTTP") : new global.XMLHttpRequest();
  xhr.open("GET", url, true);
  if ("overrideMimeType" in xhr) xhr.overrideMimeType("text/plain");

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;

    var status = xhr.status;
    if (status === 0 || status === 200) {
      var param = [xhr.responseText, opts];
      if (!hold) run(param);
      if (callback) callback(param);
    } else {
      throw new Error(`Could not load ${url}`);
    }
  };

  xhr.send(null);
}

function runScripts() {
  var scripts = [];
  var types   = ["text/ecmascript-6", "text/6to5", "text/babel", "module"];
  var index   = 0;

  /**
   * Transform and execute script. Ensures correct load order.
   */

  function exec() {
    var param = scripts[index];
    if (param instanceof Array) {
      run(param);
      index++;
      exec();
    }
  }

  /**
   * Load, transform, and execute all scripts.
   */

  function run(script, i) {
    var opts = {};

    if (script.src) {
      load(script.src, function (param) {
        scripts[i] = param;
        exec();
      }, opts, true);
    } else {
      opts.filename = "embedded";
      scripts[i] = [script.innerHTML, opts];
    }
  }

  // Collect scripts with Babel `types`.

  var _scripts = global.document.getElementsByTagName("script");

  for (var i = 0; i < _scripts.length; ++i) {
    var _script = _scripts[i];
    if (types.indexOf(_script.type) >= 0) scripts.push(_script);
  }

  for (i in scripts) {
    run(scripts[i], i);
  }

  exec();
}

/**
 * Register load event to transform and execute scripts.
 */

if (global.addEventListener) {
  global.addEventListener("DOMContentLoaded", runScripts, false);
} else if (global.attachEvent) {
  global.attachEvent("onload", runScripts);
}
