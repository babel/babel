var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  function Foo() {
    var _this;
    babelHelpers.classCallCheck(this, Foo);
    foo((_this = babelHelpers.callSuper(this, Foo), _this.bar = "foo", babelHelpers.assertThisInitialized(_this)));
    return _this;
  }
  babelHelpers.inherits(Foo, _Bar);
  return babelHelpers.createClass(Foo);
}(Bar);
