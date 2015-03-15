"use strict";

var obj = (function () {
  var _obj = {};
  babelHelpers.defineProperty(_obj, "x" + foo, "heh");
  babelHelpers.defineProperty(_obj, "y" + bar, "noo");
  return _obj;
})();
