var _foo = /*#__PURE__*/new WeakMap();

var Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    _foo.set(this, 0);
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test(other) {
      var _other$obj;

      babelHelpers.classPrivateFieldSet2(this, _foo, babelHelpers.classPrivateFieldGet2(this, _foo) + 1);
      babelHelpers.classPrivateFieldSet2(this, _foo, 2);
      babelHelpers.classPrivateFieldSet2(_other$obj = other.obj, _foo, babelHelpers.classPrivateFieldGet2(_other$obj, _foo) + 1);
      babelHelpers.classPrivateFieldSet2(other.obj, _foo, 2);
    }
  }]);
  return Foo;
}();
