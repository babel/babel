var _foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");

var _bar = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("bar");

let Foo = /*#__PURE__*/function () {
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
      var _bar2 = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("bar");

      let Nested = /*#__PURE__*/function () {
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
            Object.prototype.hasOwnProperty.call(this, _foo);
            Object.prototype.hasOwnProperty.call(this, _bar2);
          }
        }]);
        return Nested;
      }();

      Object.prototype.hasOwnProperty.call(this, _foo);
      Object.prototype.hasOwnProperty.call(this, _bar);
    }
  }]);
  return Foo;
}();
