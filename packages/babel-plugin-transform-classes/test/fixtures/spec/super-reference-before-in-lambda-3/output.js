var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  function Foo() {
    var _this;
    babelHelpers.classCallCheck(this, Foo);
    var t = () => babelHelpers.superPropGet((babelHelpers.assertThisInitialized(_this), Foo), "test", _this, 3)([]);
    _this = babelHelpers.callSuper(this, Foo);
    t();
    return _this;
  }
  babelHelpers.inherits(Foo, _Bar);
  return babelHelpers.createClass(Foo);
}(Bar);
