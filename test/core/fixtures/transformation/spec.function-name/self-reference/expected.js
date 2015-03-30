"use strict";

var f = (function (_f) {
  var _fWrapper = function f() {
    return _f.apply(this, arguments);
  };

  _fWrapper.toString = function () {
    return _f.toString();
  };

  return _fWrapper;
})(function () {
  console.log(f, g);
});
