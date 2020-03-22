var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  babelHelpers.inherits(Test, _Foo);

  var _super = babelHelpers.createSuper(Test);

  function Test() {
    var _this;

    babelHelpers.classCallCheck(this, Test);
    _this = _super.call(this);
    babelHelpers.get(babelHelpers.getPrototypeOf(Test.prototype), "test", babelHelpers.assertThisInitialized(_this));
    babelHelpers.get(babelHelpers.getPrototypeOf(Test.prototype), "test", babelHelpers.assertThisInitialized(_this)).whatever;
    return _this;
  }

  return Test;
}(Foo);
