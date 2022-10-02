var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);
  var _super = babelHelpers.createSuper(Foo);
  function Foo() {
    var _thisSuper, _this;
    babelHelpers.classCallCheck(this, Foo);
    var t = () => babelHelpers.get((_thisSuper = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Foo.prototype)), "test", _thisSuper).call(_thisSuper);
    return _this = _super.call(this);
  }
  return babelHelpers.createClass(Foo);
}(Bar);
