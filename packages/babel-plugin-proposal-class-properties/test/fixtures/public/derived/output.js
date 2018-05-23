var Foo =
/*#__PURE__*/
function (_Bar) {
  "use strict";

  function Foo(...args) {
    var _temp, _this;

    babelHelpers.classCallCheck(this, Foo);
    return babelHelpers.possibleConstructorReturn(_this, (_temp = _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Foo).call(this, ...args)), babelHelpers.defineProperty(babelHelpers.assertThisInitialized(babelHelpers.assertThisInitialized(_this)), "bar", "foo"), _temp));
  }

  babelHelpers.inherits(Foo, _Bar);
  return Foo;
}(Bar);
