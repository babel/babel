var Foo =
/*#__PURE__*/
function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    var _this;

    babelHelpers.classCallCheck(this, Foo);

    var fn = () => babelHelpers.assertThisInitialized(babelHelpers.assertThisInitialized(_this));

    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Foo).call(this));
    fn();
    return _this;
  }

  return Foo;
}(Bar);
