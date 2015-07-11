"use strict";

var Foo = (function () {
  var _instanceInitializers = {};

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.defineDecoratedPropertyDescriptor(this, "foo", _instanceInitializers);
  }

  babelHelpers.createDecoratedClass(Foo, [{
    key: "foo",
    decorators: [bar],
    initializer: function initializer() {
      return "Bar";
    },
    enumerable: true
  }], null, _instanceInitializers);
  return Foo;
})();