var _foo = /*#__PURE__*/new WeakMap();

var Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    _foo.set(this, 1);
  }

  babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      var _babelHelpers$classPr;

      var _foo2 = /*#__PURE__*/new WeakMap();

      var _foo3 = /*#__PURE__*/new WeakMap();

      var Nested = /*#__PURE__*/function (_ref) {
        babelHelpers.inherits(Nested, _ref);

        var _super = babelHelpers.createSuper(Nested);

        function Nested(...args) {
          var _this;

          babelHelpers.classCallCheck(this, Nested);
          _this = _super.call(this, ...args);

          _foo2.set(babelHelpers.assertThisInitialized(_this), 3);

          return _this;
        }

        return Nested;
      }((_babelHelpers$classPr = babelHelpers.classPrivateFieldGet2(this, _foo3), function _class() {
        babelHelpers.classCallCheck(this, _class);

        _foo3.set(this, 2);

        babelHelpers.defineProperty(this, _babelHelpers$classPr, 2);
      }));
    }
  }]);
  return Foo;
}();
