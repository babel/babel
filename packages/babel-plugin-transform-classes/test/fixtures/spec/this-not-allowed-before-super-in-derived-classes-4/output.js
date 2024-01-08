var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);
  function Foo() {
    var _this;
    babelHelpers.classCallCheck(this, Foo);
    var fn = () => babelHelpers.assertThisInitialized(_this);
    _this = babelHelpers.callSuper(this, Foo);
    fn();
    return _this;
  }
  return babelHelpers.createClass(Foo);
}(Bar);
