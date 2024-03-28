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
  return babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      var _babelHelpers$assertC;
      var _foo2 = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");
      _babelHelpers$assertC = babelHelpers.assertClassBrandLoose(this, _foo2, 1);
      var Nested = /*#__PURE__*/function () {
        function Nested() {
          babelHelpers.classCallCheck(this, Nested);
          Object.defineProperty(this, _foo2, {
            writable: true,
            value: 2
          });
        }
        return babelHelpers.createClass(Nested, [{
          key: _babelHelpers$assertC,
          value: function () {}
        }]);
      }();
      babelHelpers.assertClassBrandLoose(this, _foo, 1);
    }
  }]);
}();
