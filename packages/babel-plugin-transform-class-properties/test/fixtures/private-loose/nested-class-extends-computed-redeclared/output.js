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
  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      var _foo3;
      var _babelHelpers$classPr;
      var _foo2 = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");
      var Nested = /*#__PURE__*/function (_ref) {
        babelHelpers.inherits(Nested, _ref);
        function Nested(...args) {
          var _this;
          babelHelpers.classCallCheck(this, Nested);
          _this = babelHelpers.callSuper(this, Nested, [...args]);
          Object.defineProperty(babelHelpers.assertThisInitialized(_this), _foo2, {
            writable: true,
            value: 3
          });
          return _this;
        }
        return babelHelpers.createClass(Nested);
      }((_foo3 = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo"), _babelHelpers$classPr = babelHelpers.classPrivateFieldLooseBase(this, _foo3)[_foo3], /*#__PURE__*/function () {
        function _class() {
          babelHelpers.classCallCheck(this, _class);
          Object.defineProperty(this, _foo3, {
            writable: true,
            value: 2
          });
          this[_babelHelpers$classPr] = 2;
        }
        return babelHelpers.createClass(_class);
      }()));
    }
  }]);
  return Foo;
}();
