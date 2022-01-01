var _foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");

var Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    Object.defineProperty(this, _foo, {
      writable: true,
      value: 1
    });
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      var _babelHelpers$classPr;

      var _foo2 = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");

      _babelHelpers$classPr = babelHelpers.classPrivateFieldLooseBase(this, _foo2)[_foo2];

      var Nested = /*#__PURE__*/function (_babelHelpers$classPr2) {
        function Nested() {
          babelHelpers.classCallCheck(this, Nested);
          Object.defineProperty(this, _foo2, {
            writable: true,
            value: 2
          });
        }

        babelHelpers.createClass(Nested, [{
          key: _babelHelpers$classPr2,
          value: function () {}
        }]);
        return Nested;
      }(_babelHelpers$classPr);

      babelHelpers.classPrivateFieldLooseBase(this, _foo)[_foo];
    }
  }]);
  return Foo;
}();
