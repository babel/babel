var _tag = /*#__PURE__*/new WeakMap();

var Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    _tag.set(this, {
      writable: true,
      value: void 0
    });
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      babelHelpers.classPrivateFieldGet(this, _tag).bind(this)``;
    }
  }]);
  return Foo;
}();

new Foo();
