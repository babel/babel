var _foo = /*#__PURE__*/new WeakMap();
let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.classPrivateFieldInitSpec(this, _foo, 1);
  }
  return babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      var _foo3;
      let _babelHelpers$classPr;
      var _foo2 = /*#__PURE__*/new WeakMap();
      let Nested = /*#__PURE__*/function (_ref) {
        function Nested() {
          var _this;
          babelHelpers.classCallCheck(this, Nested);
          _this = babelHelpers.callSuper(this, Nested, arguments);
          babelHelpers.classPrivateFieldInitSpec(_this, _foo2, 3);
          return _this;
        }
        babelHelpers.inherits(Nested, _ref);
        return babelHelpers.createClass(Nested);
      }((_foo3 = /*#__PURE__*/new WeakMap(), _babelHelpers$classPr = babelHelpers.classPrivateFieldGet2(_foo3, this), /*#__PURE__*/babelHelpers.createClass(function _class() {
        babelHelpers.classCallCheck(this, _class);
        babelHelpers.classPrivateFieldInitSpec(this, _foo3, 2);
        babelHelpers.defineProperty(this, _babelHelpers$classPr, 2);
      })));
    }
  }]);
}();
