"use strict";

var Foo = (function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createClass(Foo, null, [{
    key: "bar",
    enumerable: true,
    value: "foo"
  }]);
  return Foo;
})();
