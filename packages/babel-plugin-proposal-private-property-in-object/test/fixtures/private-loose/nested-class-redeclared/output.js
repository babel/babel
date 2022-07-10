var _foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");

let Foo = /*#__PURE__*/function () {
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
      var _foo2 = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");

      let Nested = /*#__PURE__*/function () {
        function Nested() {
          babelHelpers.classCallCheck(this, Nested);
          Object.defineProperty(this, _foo2, {
            writable: true,
            value: 2
          });
        }

        babelHelpers.createClass(Nested, [{
          key: "test",
          value: function test() {
            Object.prototype.hasOwnProperty.call(this, _foo2);
          }
        }]);
        return Nested;
      }();

      Object.prototype.hasOwnProperty.call(this, _foo);
    }
  }]);
  return Foo;
}();
