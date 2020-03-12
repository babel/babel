var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    var _this;

    babelHelpers.classCallCheck(this, Foo);

    if (condition) {
      try {
        _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Foo).call(this));
      } finally {
        babelHelpers.defineProperty(babelHelpers.assertThisInitialized(_this), "bar", "foo");
      }
    } else {
      try {
        _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Foo).call(this));
      } finally {
        babelHelpers.defineProperty(babelHelpers.assertThisInitialized(_this), "bar", "foo");
      }
    }

    return babelHelpers.possibleConstructorReturn(_this);
  }

  return Foo;
}(Bar);
