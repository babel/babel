"use strict";

var f = function f() {
  var f = 2;
};

var f = (function (_f) {
  function f(_x) {
    return _f.apply(this, arguments);
  }

  f.toString = function () {
    return f.toString();
  };

  return f;
})(function (f) {});

var obj = {
  f: (function (_f) {
    function f(_x) {
      return _f.apply(this, arguments);
    }

    f.toString = function () {
      return f.toString();
    };

    return f;
  })(function (f) {})
};