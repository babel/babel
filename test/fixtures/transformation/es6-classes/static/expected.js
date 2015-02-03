"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var A = (function () {
  function A() {
    _classCallCheck(this, A);
  }

  _prototypeProperties(A, {
    a: {
      value: function a() {},
      writable: true,
      configurable: true
    },
    b: {
      get: function () {},
      set: function (b) {},
      configurable: true
    }
  });

  return A;
})();