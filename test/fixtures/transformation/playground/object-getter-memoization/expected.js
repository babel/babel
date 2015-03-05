"use strict";

var Foo = (function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createClass(Foo, babelHelpers.defineProperty({
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
  return Foo;
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