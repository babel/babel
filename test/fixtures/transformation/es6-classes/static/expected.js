"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var A = (function () {
  var A = function A() {};

  A.a = function () {};

  _classProps(A, {
    b: {
      get: function () {},
      set: function (b) {},
      enumerable: true
    }
  });

  return A;
})();
