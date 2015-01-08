"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var _defineProperty = function (obj, key, value) {
  return Object.defineProperty(obj, key, {
    value: value,
    enumerable: true,
    configurable: true,
    writable: true
  });
};

var Foo = function Foo() {};

_prototypeProperties(Foo, null, _defineProperty({
  bar: {
    get: function () {
      return _defineProperty(this, "bar", complex()).bar;
    },
    enumerable: true
  }
}, bar, {
  get: function () {
    return _defineProperty(this, bar, complex())[bar];
  },
  enumerable: true
}));

var foo = Object.defineProperties({}, _defineProperty({
  bar: {
    get: function () {
      return _defineProperty(this, "bar", complex()).bar;
    },
    enumerable: true
  }
}, bar, {
  get: function () {
    return _defineProperty(this, bar, complex())[bar];
  },
  enumerable: true
}));
