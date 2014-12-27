"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var A = function A() {};

A.a = function () {};

_prototypeProperties(A, {
  b: {
    get: function () {},
    set: function (b) {},
    enumerable: true
  }
});
