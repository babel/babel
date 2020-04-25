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
      var _temp, _foo3;

      var _babelHelpers$classPr;

      var Nested = /*#__PURE__*/function (_ref) {
        babelHelpers.inherits(Nested, _ref);

        var _super = babelHelpers.createSuper(Nested);

        function Nested(...args) {
          var _this;

          babelHelpers.classCallCheck(this, Nested);
          _this = _super.call(this, ...args);
          Object.defineProperty(babelHelpers.assertThisInitialized(_this), _foo2, {
            writable: true,
            value: 3
          });
          return _this;
        }

        return Nested;
      }((_temp = (_babelHelpers$classPr = babelHelpers.classPrivateFieldLooseBase(this, _foo3)[_foo3], /*#__PURE__*/function () {
        function _class2() {
          babelHelpers.classCallCheck(this, _class2);
          Object.defineProperty(this, _foo3, {
            writable: true,
            value: 2
          });
          this[_babelHelpers$classPr] = 2;
        }

        return _class2;
      }()), _foo3 = babelHelpers.classPrivateFieldLooseKey("foo"), _temp));

      var _foo2 = babelHelpers.classPrivateFieldLooseKey("foo");
    }
  }]);
  return Foo;
}();

var _foo = babelHelpers.classPrivateFieldLooseKey("foo");
