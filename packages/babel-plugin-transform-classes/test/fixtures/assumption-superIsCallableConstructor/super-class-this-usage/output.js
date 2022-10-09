var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  babelHelpers.inherits(Test, _Foo);
  function Test() {
    var _this;
    babelHelpers.classCallCheck(this, Test);
    _this = _Foo.call(this) || this;
    babelHelpers.assertThisInitialized(_this);
    _this.prop = 1;
    return _this;
  }
  return babelHelpers.createClass(Test);
}(Foo);
