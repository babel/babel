var Foo =
/*#__PURE__*/
function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);

  function Foo(...args) {
    var _temp, _this;

    babelHelpers.classCallCheck(this, Foo);
    return babelHelpers.possibleConstructorReturn(_this, (_temp = _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Foo).call(this, ...args)), _this.bar = "foo", _temp));
  }

  return Foo;
}(Bar);
