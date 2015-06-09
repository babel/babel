"use strict";

var Test = (function (_Foo) {
  function Test() {
    babelHelpers.classCallCheck(this, Test);

    woops["super"].test();
    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "constructor", this).call(this);
    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", this).call(this);

    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "constructor", this).apply(this, arguments);
    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "constructor", this).apply(this, ["test"].concat(babelHelpers.slice.call(arguments)));

    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", this).apply(this, arguments);
    babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", this).apply(this, ["test"].concat(babelHelpers.slice.call(arguments)));
  }

  babelHelpers.inherits(Test, _Foo);
  babelHelpers.createClass(Test, [{
    key: "test",
    value: function test() {
      babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", this).call(this);
      babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", this).apply(this, arguments);
      babelHelpers.get(Object.getPrototypeOf(Test.prototype), "test", this).apply(this, ["test"].concat(babelHelpers.slice.call(arguments)));
    }
  }], [{
    key: "foo",
    value: function foo() {
      babelHelpers.get(Object.getPrototypeOf(Test), "foo", this).call(this);
      babelHelpers.get(Object.getPrototypeOf(Test), "foo", this).apply(this, arguments);
      babelHelpers.get(Object.getPrototypeOf(Test), "foo", this).apply(this, ["test"].concat(babelHelpers.slice.call(arguments)));
    }
  }]);
  return Test;
})(Foo);