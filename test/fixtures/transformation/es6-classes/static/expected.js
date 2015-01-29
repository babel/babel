"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var A = (function () {
  function A() {}

  _prototypeProperties(A, {
    a: {
      value: function a() {},
      enumerable: false,
      writable: true,
      configurable: true
    },
    b: {
      get: function () {},
      enumerable: false,
      set: function (b) {},
      configurable: true
    }
  });

  return A;
})();