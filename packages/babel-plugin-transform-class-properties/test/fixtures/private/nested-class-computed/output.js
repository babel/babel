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
      let Nested = /*#__PURE__*/function (_babelHelpers$classPr) {
        function Nested() {
          babelHelpers.classCallCheck(this, Nested);
        }
        return babelHelpers.createClass(Nested, [{
          key: _babelHelpers$classPr,
          value: function () {}
        }]);
      }(babelHelpers.classPrivateFieldGet2(_foo, this));
      babelHelpers.classPrivateFieldGet2(_foo, this);
    }
  }]);
}();
