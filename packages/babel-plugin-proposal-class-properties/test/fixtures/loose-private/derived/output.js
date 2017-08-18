var _prop, _prop2;

var Foo = function Foo() {
  babelHelpers.classCallCheck(this, Foo);
  Object.defineProperty(this, _prop, {
    writable: true,
    value: "foo"
  });
};

_prop = babelHelpers.privateClassPropertyKey("prop");

var Bar = function (_Foo) {
  babelHelpers.inherits(Bar, _Foo);

  function Bar() {
    var _temp, _this;

    babelHelpers.classCallCheck(this, Bar);
    return babelHelpers.possibleConstructorReturn(_this, (_temp = _this = babelHelpers.possibleConstructorReturn(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).apply(this, arguments)), Object.defineProperty(_this, _prop2, {
      writable: true,
      value: "bar"
    }), _temp));
  }

  return Bar;
}(Foo);

_prop2 = babelHelpers.privateClassPropertyKey("prop");
