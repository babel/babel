var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);
  var _super = babelHelpers.createSuper(Foo);
  function Foo() {
    var _this;
    babelHelpers.classCallCheck(this, Foo);
    return _this = _super.call(this, () => {
      _this.test;
    });
  }
  return babelHelpers.createClass(Foo);
}(Bar);
