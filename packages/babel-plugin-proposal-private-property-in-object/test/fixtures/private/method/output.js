var _foo = /*#__PURE__*/new WeakSet();

let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    _foo.add(this);
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      return _foo.has(other);
    }
  }]);
  return Foo;
}();

function _foo2() {}
