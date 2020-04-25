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
      var _this = this;

      var Nested = /*#__PURE__*/function () {
        function Nested() {
          babelHelpers.classCallCheck(this, Nested);
        }

        babelHelpers.createClass(Nested, [{
          key: babelHelpers.classPrivateFieldGet(_this, _foo),
          value: function () {}
        }]);
        return Nested;
      }();

      babelHelpers.classPrivateFieldGet(this, _foo);
    }
  }]);
  return Foo;
}();

var _foo = new WeakMap();
