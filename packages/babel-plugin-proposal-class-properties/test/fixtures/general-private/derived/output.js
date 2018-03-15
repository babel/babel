var _prop, _prop2;

var Foo = function Foo() {
  babelHelpers.classCallCheck(this, Foo);

  _prop.set(this, "foo");
};

_prop = new WeakMap();

var Bar =
/*#__PURE__*/
function (_Foo) {
  babelHelpers.inherits(Bar, _Foo);

  function Bar() {
    var _temp, _this;

    babelHelpers.classCallCheck(this, Bar);
    return babelHelpers.possibleConstructorReturn(_this, (_temp = _this = babelHelpers.possibleConstructorReturn(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).apply(this, arguments)), _prop2.set(babelHelpers.assertThisInitialized(_this), "bar"), _temp));
  }

  return Bar;
}(Foo);

_prop2 = new WeakMap();
