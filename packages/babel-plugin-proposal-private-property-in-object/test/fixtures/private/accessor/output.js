var _foo = /*#__PURE__*/new WeakMap();

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

function _get_foo() {}
