"use strict";

var Foo = (function () {
  var _Foo = function Foo() {
    babelHelpers.classCallCheck(this, _Foo);
  };

  babelHelpers.createClass(_Foo, babelHelpers.defineProperty({
    bar: {
      get: function () {
        return babelHelpers.defineProperty(this, "bar", complex()).bar;
      }
    }
  }, bar, {
    get: function () {
      return babelHelpers.defineProperty(this, bar, complex())[bar];
    }
  }));
  return _Foo;
})();

var foo = Object.defineProperties({}, babelHelpers.defineProperty({
  bar: {
    get: function () {
      return babelHelpers.defineProperty(this, "bar", complex()).bar;
    },
    configurable: true,
    enumerable: true
  }
}, bar, {
  get: function () {
    return babelHelpers.defineProperty(this, bar, complex())[bar];
  },
  configurable: true,
  enumerable: true
}));