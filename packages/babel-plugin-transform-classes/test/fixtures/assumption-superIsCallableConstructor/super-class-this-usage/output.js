var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  function Test() {
    var _this;
    babelHelpers.classCallCheck(this, Test);
    _this = _Foo.call(this) || this;
    babelHelpers.assertThisInitialized(_this);
    _this.prop = 1;
    return _this;
  }
  babelHelpers.inherits(Test, _Foo);
  return babelHelpers.createClass(Test);
}(Foo);
