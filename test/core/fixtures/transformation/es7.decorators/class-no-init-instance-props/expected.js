"use strict";

var Foo = (function () {
  var _instanceInitializers = {};

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    this.foo = _instanceInitializers.foo.call(this);
  }

  babelHelpers.createDecoratedClass(Foo, [{
    key: "foo",
    decorators: [bar],
    initializer: function () {},
    enumerable: true
  }], null, _instanceInitializers);
  return Foo;
})();
