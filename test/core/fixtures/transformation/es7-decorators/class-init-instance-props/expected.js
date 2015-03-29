"use strict";

var Foo = (function () {
  var _instanceInitializers = {};

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    this.foo = _instanceInitializers.foo.call(this);
  }

  babelHelpers.createDecoratedClass(Foo, [{
    key: "foo",
    enumerable: true,
    decorators: [bar],
    initializer: function () {
      return "Bar";
    }
  }], null, _instanceInitializers);
  return Foo;
})();