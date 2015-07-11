"use strict";

var Foo = (function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createDecoratedClass(Foo, [{
    key: "foo",
    decorators: [bar, foo],
    get: function get() {},
    set: function set(bar) {}
  }]);
  return Foo;
})();