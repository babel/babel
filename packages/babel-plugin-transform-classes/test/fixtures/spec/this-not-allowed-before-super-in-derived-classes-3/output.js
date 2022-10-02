var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);
  var _super = babelHelpers.createSuper(Foo);
  function Foo() {
    var _this;
    babelHelpers.classCallCheck(this, Foo);
    var fn = () => babelHelpers.assertThisInitialized(_this);
    fn();
    return _this = _super.call(this);
  }
  return babelHelpers.createClass(Foo);
}(Bar);
