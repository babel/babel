"use strict";

var Test = (function (Foo) {
  function Test() {
    babelHelpers.classCallCheck(this, Test);

    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", this).whatever();
    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", this).call(this);
  }

  babelHelpers.inherits(Test, Foo);
  babelHelpers.createClass(Test, null, {
    test: {
      value: function test() {
        return babelHelpers.get(Object.getPrototypeOf(Test), "wow", this).call(this);
      }
    }
  });
  return Test;
})(Foo);