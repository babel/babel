var _foo = /*#__PURE__*/new WeakMap();
var _bar = /*#__PURE__*/new WeakMap();
let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.classPrivateFieldInitSpec(this, _foo, {
      writable: true,
      value: 1
    });
    babelHelpers.classPrivateFieldInitSpec(this, _bar, {
      writable: true,
      value: 1
    });
  }
  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      var _bar2 = /*#__PURE__*/new WeakMap();
      let Nested = /*#__PURE__*/function () {
        function Nested() {
          babelHelpers.classCallCheck(this, Nested);
          babelHelpers.classPrivateFieldInitSpec(this, _bar2, {
            writable: true,
            value: 2
          });
        }
        babelHelpers.createClass(Nested, [{
          key: "test",
          value: function test() {
            _foo.has(babelHelpers.checkInRHS(this));
            _bar2.has(babelHelpers.checkInRHS(this));
          }
        }]);
        return Nested;
      }();
      _foo.has(babelHelpers.checkInRHS(this));
      _bar.has(babelHelpers.checkInRHS(this));
    }
  }]);
  return Foo;
}();
