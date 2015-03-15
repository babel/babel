"use strict";

var obj = (function () {
  var _obj = {};
  babelHelpers.defineProperty(_obj, "x" + foo, "heh");
  babelHelpers.defineProperty(_obj, "y" + bar, "noo");
  babelHelpers.defineProperty(_obj, "foo", "foo");
  babelHelpers.defineProperty(_obj, "bar", "bar");
  return _obj;
})();
