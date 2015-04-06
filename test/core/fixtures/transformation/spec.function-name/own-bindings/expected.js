"use strict";

var f = function f() {
  var f = 2;
};

var f = (function (_f) {
  function f(_x) {
    return _f.apply(this, arguments);
  }

  f.toString = function () {
    return _f.toString();
  };

  return f;
})(function (f) {});

var obj = {
  f: (function (_f2) {
    function f(_x2) {
      return _f2.apply(this, arguments);
    }

    f.toString = function () {
      return _f2.toString();
    };

    return f;
  })(function (f) {})
};
