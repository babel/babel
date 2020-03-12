var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);

  function Foo(...args) {
    var _this;

    babelHelpers.classCallCheck(this, Foo);

    try {
      _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Foo).call(this, ...args));
    } finally {
      babelHelpers.defineProperty(babelHelpers.assertThisInitialized(_this), "bar", "foo");
    }

    return _this;
  }

  return Foo;
}(Bar);
