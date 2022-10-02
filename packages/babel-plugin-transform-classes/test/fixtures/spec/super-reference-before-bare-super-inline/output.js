var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);
  var _super = babelHelpers.createSuper(Foo);
  function Foo() {
    var _thisSuper, _this;
    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.get((_thisSuper = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Foo.prototype)), "foo", _thisSuper).call(_thisSuper, _this = _super.call(this));
    return _this;
  }
  return babelHelpers.createClass(Foo);
}(Bar);
