"use strict";

var f = function f() {
  var f = 2;
};

var f = (function (_f) {
  var _fWrapper = function f(_x) {
    return _f.apply(this, arguments);
  };

  _fWrapper.toString = function () {
    return _f.toString();
  };

  return _fWrapper;
})(function (f) {});

var obj = {
  f: (function (_f) {
    var _fWrapper = function f(_x) {
      return _f.apply(this, arguments);
    };

    _fWrapper.toString = function () {
      return _f.toString();
    };

    return _fWrapper;
  })(function (f) {})
};
