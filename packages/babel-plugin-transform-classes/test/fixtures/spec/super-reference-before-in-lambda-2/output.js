var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);

  var _super = babelHelpers.createSuper(Foo);

  function Foo() {
    var _this;

    babelHelpers.classCallCheck(this, Foo);

    var t = () => babelHelpers.get(babelHelpers.getPrototypeOf(Foo.prototype), "test", babelHelpers.assertThisInitialized(_this)).call(babelHelpers.assertThisInitialized(_this));

    babelHelpers.get(babelHelpers.getPrototypeOf(Foo.prototype), "foo", babelHelpers.assertThisInitialized(_this)).call(babelHelpers.assertThisInitialized(_this));
    return _this = _super.call(this);
  }

  return Foo;
}(Bar);
