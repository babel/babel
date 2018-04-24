var Foo =
/*#__PURE__*/
function (_Bar) {
  "use strict";

  function Foo() {
    var _this;

    babelHelpers.classCallCheck(this, Foo);

    var fn = () => babelHelpers.assertThisInitialized(babelHelpers.assertThisInitialized(_this));

    fn();
    return _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Foo).call(this));
  }

  babelHelpers.inherits(Foo, _Bar);
  return Foo;
}(Bar);
