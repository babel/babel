var _foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");
var _bar = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("bar");
var Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    Object.defineProperty(this, _foo, {
      writable: true,
      value: 1
    });
    Object.defineProperty(this, _bar, {
      writable: true,
      value: 1
    });
  }
  return babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      var _bar2 = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("bar");
      var Nested = /*#__PURE__*/function () {
        function Nested() {
          babelHelpers.classCallCheck(this, Nested);
          Object.defineProperty(this, _bar2, {
            writable: true,
            value: 2
          });
        }
        return babelHelpers.createClass(Nested, [{
          key: "test",
          value: function test() {
            babelHelpers.classPrivateFieldLooseBase(this, _foo)[_foo];
            babelHelpers.classPrivateFieldLooseBase(this, _bar2)[_bar2];
          }
        }]);
      }();
      babelHelpers.classPrivateFieldLooseBase(this, _foo)[_foo];
      babelHelpers.classPrivateFieldLooseBase(this, _bar)[_bar];
    }
  }]);
}();
