"use strict";

var Foo = (function () {
  var _staticInitializers = {};

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createDecoratedClass(Foo, null, [{
    key: "foo",
    enumerable: true,
    decorators: [bar],
    initializer: function () {
      return "Bar";
    }
  }], null, _staticInitializers);
  Foo.foo = _staticInitializers.foo.call(Foo);
  return Foo;
})();