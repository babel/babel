var _foo = /*#__PURE__*/new WeakMap();
let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.classPrivateFieldInitSpec(this, _foo, 1);
  }
  return babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      let _babelHelpers$classPr;
      var _foo2 = /*#__PURE__*/new WeakMap();
      _babelHelpers$classPr = babelHelpers.classPrivateFieldGet2(_foo2, this);
      let Nested = /*#__PURE__*/function () {
        function Nested() {
          babelHelpers.classCallCheck(this, Nested);
          babelHelpers.classPrivateFieldInitSpec(this, _foo2, 2);
        }
        return babelHelpers.createClass(Nested, [{
          key: _babelHelpers$classPr,
          value: function () {}
        }]);
      }();
      babelHelpers.classPrivateFieldGet2(_foo, this);
    }
  }]);
}();
