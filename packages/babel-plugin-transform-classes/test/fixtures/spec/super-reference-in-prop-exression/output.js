var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);

  var _super = babelHelpers.createSuper(Foo);

  function Foo() {
    var _this;

    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.get(babelHelpers.getPrototypeOf(Foo.prototype), (_this = _super.call(this)).method, babelHelpers.assertThisInitialized(_this)).call(babelHelpers.assertThisInitialized(_this));
    return _this;
  }

  return Foo;
}(Bar);
