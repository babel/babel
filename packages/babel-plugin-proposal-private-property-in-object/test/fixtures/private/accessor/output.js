let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    _foo.set(this, {
      get: _get_foo,
      set: void 0
    });
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      return _foo.has(other);
    }
  }]);
  return Foo;
}();

var _foo = new WeakMap();

var _get_foo = function () {};
