var _foo = new WeakMap();

let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    _foo.set(this, {
      writable: true,
      value: 1
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
