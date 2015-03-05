"use strict";

var Test = (function (Foo) {
  function Test() {
    babelHelpers.classCallCheck(this, Test);

    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", this);
    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", this).whatever;
  }

  babelHelpers.inherits(Test, Foo);
  return Test;
})(Foo);