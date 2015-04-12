"use strict";

var Foo = (function (_Bar) {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    if (_Bar != null) {
      _Bar.apply(this, arguments);
    }

    this.bar = "foo";
  }

  babelHelpers.inherits(Foo, _Bar);
  babelHelpers.createClass(Foo, [{
    key: "bar",
    value: undefined,
    enumerable: true
  }]);
  return Foo;
})(Bar);