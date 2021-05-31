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
      let Nested = /*#__PURE__*/function () {
        function Nested() {
          babelHelpers.classCallCheck(this, Nested);
        }

        babelHelpers.createClass(Nested, [{
          key: "test",
          value: function test() {
            Object.prototype.hasOwnProperty.call(this, _foo);
          }
        }]);
        return Nested;
      }();

      Object.prototype.hasOwnProperty.call(this, _foo);
    }
  }]);
  return Foo;
}();
