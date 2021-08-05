var _foo = /*#__PURE__*/new WeakMap();

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
      var _babelHelpers$classPr;

      var _foo2 = /*#__PURE__*/new WeakMap();

      _babelHelpers$classPr = babelHelpers.classPrivateFieldGet(this, _foo2);

      var Nested = /*#__PURE__*/function (_babelHelpers$classPr2) {
        function Nested() {
          babelHelpers.classCallCheck(this, Nested);

          _foo2.set(this, {
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

      babelHelpers.classPrivateFieldGet(this, _foo);
    }
  }]);
  return Foo;
}();
