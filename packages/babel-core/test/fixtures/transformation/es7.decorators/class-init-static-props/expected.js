"use strict";

var Foo = (function () {
  var _staticInitializers = {};

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createDecoratedClass(Foo, null, [{
    key: "foo",
    decorators: [bar],
    initializer: function initializer() {
      return "Bar";
    },
    enumerable: true
  }], null, _staticInitializers);
  babelHelpers.defineDecoratedPropertyDescriptor(Foo, "foo", _staticInitializers);
  return Foo;
})();