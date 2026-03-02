var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  function Foo() {
    var _this;
    babelHelpers.classCallCheck(this, Foo);
    _this = babelHelpers.callSuper(this, Foo);
    var X = /*#__PURE__*/function (_ref) {
      function X() {
        babelHelpers.classCallCheck(this, X);
      }
      return babelHelpers.createClass(X, [{
        key: _ref,
        value: function value() {}
      }]);
    }((() => {
      var _Foo;
      babelHelpers.superPropGet((_this, Foo), "method", _this, 3)([]);
    })());
    return _this;
  }
  babelHelpers.inherits(Foo, _Bar);
  return babelHelpers.createClass(Foo);
}(Bar);
