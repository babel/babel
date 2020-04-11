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

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      var Nested = /*#__PURE__*/function () {
        function Nested() {
          babelHelpers.classCallCheck(this, Nested);
          Object.defineProperty(this, _bar2, {
            writable: true,
            value: 2
          });
        }

        babelHelpers.createClass(Nested, [{
          key: "test",
          value: function test() {
            babelHelpers.classPrivateFieldLooseBase(this, _foo)[_foo];
            babelHelpers.classPrivateFieldLooseBase(this, _bar2)[_bar2];
          }
        }]);
        return Nested;
      }();

      var _bar2 = babelHelpers.classPrivateFieldLooseKey("bar");

      babelHelpers.classPrivateFieldLooseBase(this, _foo)[_foo];
      babelHelpers.classPrivateFieldLooseBase(this, _bar)[_bar];
    }
  }]);
  return Foo;
}();

var _foo = babelHelpers.classPrivateFieldLooseKey("foo");

var _bar = babelHelpers.classPrivateFieldLooseKey("bar");
