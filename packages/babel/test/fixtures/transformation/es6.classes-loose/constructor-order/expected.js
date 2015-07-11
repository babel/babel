"use strict";

var x = (function () {
  x.prototype.f = function f() {
    1;
    2;
    3;
  };

  function x() {
    4;
    5;
    6;
    babelHelpers.classCallCheck(this, x);
  }

  return x;
})();
