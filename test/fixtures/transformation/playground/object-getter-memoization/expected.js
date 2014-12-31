"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var Foo = function Foo() {};

_prototypeProperties(Foo, null, (function (_ref) {
  _ref[bar] = {
    get: function () {
      return Object.defineProperty(this, bar, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: complex()
      })[bar];
    },
    enumerable: true
  };
  return _ref;
})({
  bar: {
    get: function () {
      return Object.defineProperty(this, "bar", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: complex()
      }).bar;
    },
    enumerable: true
  }
}));

var foo = (function (_foo) {
  _foo[bar] = function () {
    return Object.defineProperty(this, bar, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: complex()
    })[bar];
  };

  return _foo;
})((function (_ref2) {
  Object.defineProperties(_ref2, {
    bar: {
      get: function () {
        return Object.defineProperty(this, "bar", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: complex()
        }).bar;
      },
      enumerable: true
    }
  });

  return _ref2;
})({}));
