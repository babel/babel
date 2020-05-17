var _foo = new WeakMap();

var Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    _foo.set(this, {
      writable: true,
      value: 1
    });
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      var _foo2 = new WeakMap();

      var Nested = /*#__PURE__*/function () {
        function Nested() {
          babelHelpers.classCallCheck(this, Nested);

          _foo2.set(this, {
            writable: true,
            value: 2
          });
        }

        babelHelpers.createClass(Nested, [{
          key: "test",
          value: function test() {
            babelHelpers.classPrivateFieldGet(this, _foo2);
          }
        }]);
        return Nested;
      }();

      babelHelpers.classPrivateFieldGet(this, _foo);
    }
  }]);
  return Foo;
}();
