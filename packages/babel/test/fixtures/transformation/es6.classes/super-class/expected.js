"use strict";

var Test = (function (_Foo) {
  function Test() {
    babelHelpers.classCallCheck(this, Test);
    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "constructor", this).apply(this, arguments);
  }

  babelHelpers.inherits(Test, _Foo);
  return Test;
})(Foo);