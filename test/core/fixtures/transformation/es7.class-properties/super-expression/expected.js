"use strict";

var Foo = (function (_Bar) {
  function Foo() {
    var _temp;

    babelHelpers.classCallCheck(this, Foo);

    foo((_temp = babelHelpers.get(Object.getPrototypeOf(Foo.prototype), "constructor", this).call(this), this.bar = "foo", _temp));
  }

  babelHelpers.inherits(Foo, _Bar);
  babelHelpers.createClass(Foo, [{
    key: "bar",
    value: undefined,
    enumerable: true
  }]);
  return Foo;
})(Bar);