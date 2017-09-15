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
      return babelHelpers.classPrivateFieldBase(this, _foo)[_foo];
    }
  }]);
  return Base;
}();

_foo = babelHelpers.classPrivateFieldKey("foo");
Object.defineProperty(Base, _foo, {
  writable: true,
  value: 1
});

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

_foo2 = babelHelpers.classPrivateFieldKey("foo");
Object.defineProperty(Sub1, _foo2, {
  writable: true,
  value: 2
});

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
