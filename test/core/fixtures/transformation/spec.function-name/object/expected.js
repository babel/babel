"use strict";

var obj = {
  f: function f() {
    (function f() {
      console.log(f);
    })();
  },

  h: (function (_h) {
    var _hWrapper = function h() {
      return _h.apply(this, arguments);
    };

    _hWrapper.toString = function () {
      return _h.toString();
    };

    return _hWrapper;
  })(function () {
    console.log(h);
  }),

  m: function m() {
    doSmth();
  }
};
