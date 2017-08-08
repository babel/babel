var Foo = function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo(...args) {
    var _temp, _this;

    babelHelpers.classCallCheck(this, Foo);
    return babelHelpers.possibleConstructorReturn(_this, (_temp = _this = babelHelpers.possibleConstructorReturn(this, (Foo.__proto__ || Object.getPrototypeOf(Foo)).call(this, ...args)), _this.bar = "foo", _temp));
  }

  return Foo;
}(Bar);
