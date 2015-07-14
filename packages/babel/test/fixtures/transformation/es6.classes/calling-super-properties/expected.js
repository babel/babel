"use strict";

var Test = (function (_Foo) {
  babelHelpers.inherits(Test, _Foo);

  function Test() {
    babelHelpers.classCallCheck(this, Test);

    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "constructor", this).call(this);
    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", this).whatever();
    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", this).call(this);
  }

  babelHelpers.createClass(Test, null, [{
    key: "test",
    value: function test() {
      return babelHelpers.get(Object.getPrototypeOf(Test), "wow", this).call(this);
    }
  }]);
  return Test;
})(Foo);
