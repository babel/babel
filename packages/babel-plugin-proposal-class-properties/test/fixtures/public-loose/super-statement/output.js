var Foo =
/*#__PURE__*/
function (_Bar) {
  "use strict";

  function Foo() {
    var _this;

    babelHelpers.classCallCheck(this, Foo);
    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Foo).call(this));
    _this.bar = "foo";
    return _this;
  }

  babelHelpers.inherits(Foo, _Bar);
  return Foo;
}(Bar);
