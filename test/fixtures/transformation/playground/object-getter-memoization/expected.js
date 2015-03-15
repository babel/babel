"use strict";

var Foo = (function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createComputedClass(Foo, [{
    key: "bar",
    get: function () {
      return babelHelpers.defineProperty(this, "bar", complex()).bar;
    }
  }, {
    key: bar,
    get: function () {
      return babelHelpers.defineProperty(this, bar, complex())[bar];
    }
  }]);
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