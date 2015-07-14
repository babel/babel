"use strict";

var Test = (function (_Foo) {
  babelHelpers.inherits(Test, _Foo);

  function Test() {
    babelHelpers.classCallCheck(this, Test);

    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "constructor", this).call(this);
    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", this);
    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", this).whatever;
  }

  return Test;
})(Foo);
