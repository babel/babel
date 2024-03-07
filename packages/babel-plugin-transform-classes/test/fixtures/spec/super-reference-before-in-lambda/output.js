var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  function Foo() {
    var _thisSuper, _this;
    babelHelpers.classCallCheck(this, Foo);
    var t = () => babelHelpers.get((_thisSuper = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Foo.prototype)), "test", _thisSuper).call(_thisSuper);
    return _this = babelHelpers.callSuper(this, Foo);
  }
  babelHelpers.inherits(Foo, _Bar);
  return babelHelpers.createClass(Foo);
}(Bar);
