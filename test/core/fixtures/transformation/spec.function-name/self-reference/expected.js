"use strict";

var f = (function (_f) {
  function f() {
    return _f.apply(this, arguments);
  }

  f.toString = function () {
    return f.toString();
  };

  return f;
})(function () {
  console.log(f, g);
});
