var Foo = function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo(...args) {
    var _temp, _this, _ret;

    babelHelpers.classCallCheck(this, Foo);
    return _ret = (_temp = (_this = babelHelpers.possibleConstructorReturn(this, (Foo.__proto__ || Object.getPrototypeOf(Foo)).call(this, ...args)), _this), _this.bar = "foo", _temp), babelHelpers.possibleConstructorReturn(_this, _ret);
  }

  return Foo;
}(Bar);
