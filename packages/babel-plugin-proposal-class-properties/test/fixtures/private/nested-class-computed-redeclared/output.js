var _foo = /*#__PURE__*/new WeakMap();
var Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.classPrivateFieldInitSpec(this, _foo, {
      writable: true,
      value: 1
    });
  }
  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      var _babelHelpers$classPr;
      var _foo2 = /*#__PURE__*/new WeakMap();
      _babelHelpers$classPr = babelHelpers.classPrivateFieldGet(this, _foo2);
      var Nested = /*#__PURE__*/function () {
        function Nested() {
          babelHelpers.classCallCheck(this, Nested);
          babelHelpers.classPrivateFieldInitSpec(this, _foo2, {
            writable: true,
            value: 2
          });
        }
        babelHelpers.createClass(Nested, [{
          key: _babelHelpers$classPr,
          value: function () {}
        }]);
        return Nested;
      }();
      babelHelpers.classPrivateFieldGet(this, _foo);
    }
  }]);
  return Foo;
}();
