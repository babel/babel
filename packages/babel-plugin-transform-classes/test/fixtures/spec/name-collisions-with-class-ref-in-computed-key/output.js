var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);

  var _super = babelHelpers.createSuper(Foo);

  function Foo() {
    var _thisSuper, _this;

    babelHelpers.classCallCheck(this, Foo);
    _this = _super.call(this);

    var X = /*#__PURE__*/function () {
      function X() {
        babelHelpers.classCallCheck(this, X);
      }

      babelHelpers.createClass(X, [{
        key: (() => {
          var _Foo;

          babelHelpers.get((_thisSuper = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Foo.prototype)), "method", _thisSuper).call(_thisSuper);
        })(),
        value: function value() {}
      }]);
      return X;
    }();

    return _this;
  }

  return Foo;
}(Bar);
