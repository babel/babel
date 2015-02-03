"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

var Foo = (function () {
  function Foo() {
    _classCallCheck(this, Foo);
  }

  _prototypeProperties(Foo, null, _defineProperty({
    bar: {
      get: function () {
        return _defineProperty(this, "bar", complex()).bar;
      },
      configurable: true
    }
  }, bar, {
    get: function () {
      return _defineProperty(this, bar, complex())[bar];
    },
    configurable: true
  }));

  return Foo;
})();

var foo = Object.defineProperties({}, _defineProperty({
  bar: {
    get: function () {
      return _defineProperty(this, "bar", complex()).bar;
    },
    enumerable: true,
    configurable: true
  }
}, bar, {
  get: function () {
    return _defineProperty(this, bar, complex())[bar];
  },
  enumerable: true,
  configurable: true
}));