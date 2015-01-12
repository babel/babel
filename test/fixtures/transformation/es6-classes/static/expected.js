"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var A = (function () {
  var A = function A() {};

  _prototypeProperties(A, {
    a: {
      value: function () {},
      writable: true,
      enumerable: true,
      configurable: true
    },
    b: {
      get: function () {},
      set: function (b) {},
      enumerable: true,
      configurable: true
    }
  });

  return A;
})();
