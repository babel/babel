"use strict";

var foo = "bar";

var Foo = (function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    this.__initializeProperties();

    var foo = "foo";
  }

  babelHelpers.createClass(Foo, [{
    key: "__initializeProperties",
    value: function __initializeProperties() {
      this.bar = foo;
    }
  }]);
  return Foo;
})();
