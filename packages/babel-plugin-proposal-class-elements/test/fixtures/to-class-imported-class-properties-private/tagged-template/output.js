var _tag = /*#__PURE__*/new WeakMap();

var Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    _tag.set(this, void 0);
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      babelHelpers.classPrivateFieldGet2(this, _tag).bind(this)``;
    }
  }]);
  return Foo;
}();

new Foo();
