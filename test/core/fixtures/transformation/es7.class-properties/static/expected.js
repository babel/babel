"use strict";

var Foo = (function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createClass(Foo, null, [{
    key: "bar",
    value: "foo",
    enumerable: true
  }]);
  return Foo;
})();
