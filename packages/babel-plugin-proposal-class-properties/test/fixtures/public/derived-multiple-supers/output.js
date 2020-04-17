var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);

  var _super = babelHelpers.createSuper(Foo);

  function Foo() {
    var _this;

    babelHelpers.classCallCheck(this, Foo);

    if (condition) {
      _this = _super.call(this);
      babelHelpers.defineProperty(babelHelpers.assertThisInitialized(_this), "bar", "foo");
    } else {
      _this = _super.call(this);
      babelHelpers.defineProperty(babelHelpers.assertThisInitialized(_this), "bar", "foo");
    }

    return babelHelpers.possibleConstructorReturn(_this);
  }

  return Foo;
}(Bar);
