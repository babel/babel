"use strict";

var Foo = (function () {
  var _staticInitializers = {};

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createDecoratedClass(Foo, null, [{
    key: "foo",
    decorators: [bar],
    initializer: function () {},
    enumerable: true
  }], null, _staticInitializers);
  Foo.foo = _staticInitializers.foo.call(Foo);
  return Foo;
})();
