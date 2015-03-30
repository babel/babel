"use strict";

var Foo = (function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createDecoratedClass(Foo, [{
    key: "foo",
    decorators: [bar],
    get: function () {}
  }]);
  return Foo;
})();