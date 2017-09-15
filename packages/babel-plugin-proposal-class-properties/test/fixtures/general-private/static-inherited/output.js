var _foo, _foo2;

var Base =
/*#__PURE__*/
function () {
  function Base() {
    babelHelpers.classCallCheck(this, Base);
  }

  babelHelpers.createClass(Base, null, [{
    key: "m",
    value: function m() {
      return babelHelpers.classPrivateFieldGet(this, _foo);
    }
  }]);
  return Base;
}();

_foo = new WeakMap();

_foo.set(Base, 1);

var Sub1 =
/*#__PURE__*/
function (_Base) {
  babelHelpers.inherits(Sub1, _Base);

  function Sub1() {
    babelHelpers.classCallCheck(this, Sub1);
    return babelHelpers.possibleConstructorReturn(this, (Sub1.__proto__ || Object.getPrototypeOf(Sub1)).apply(this, arguments));
  }

  return Sub1;
}(Base);

_foo2 = new WeakMap();

_foo2.set(Sub1, 2);

var Sub2 =
/*#__PURE__*/
function (_Base2) {
  babelHelpers.inherits(Sub2, _Base2);

  function Sub2() {
    babelHelpers.classCallCheck(this, Sub2);
    return babelHelpers.possibleConstructorReturn(this, (Sub2.__proto__ || Object.getPrototypeOf(Sub2)).apply(this, arguments));
  }

  return Sub2;
}(Base);
