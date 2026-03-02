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
      var _babelHelpers$classPr;
      var _foo2 = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");
      var Nested = /*#__PURE__*/function (_ref) {
        function Nested(...args) {
          var _this;
          babelHelpers.classCallCheck(this, Nested);
          _this = babelHelpers.callSuper(this, Nested, [...args]);
          Object.defineProperty(_this, _foo2, {
            writable: true,
            value: 3
          });
          return _this;
        }
        babelHelpers.inherits(Nested, _ref);
        return babelHelpers.createClass(Nested);
      }((_babelHelpers$classPr = babelHelpers.classPrivateFieldLooseBase(this, _foo)[_foo], /*#__PURE__*/babelHelpers.createClass(function _class() {
        babelHelpers.classCallCheck(this, _class);
        this[_babelHelpers$classPr] = 2;
      })));
    }
  }]);
}();
