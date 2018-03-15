var _bar;

var Foo =
/*#__PURE__*/
function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    var _this2;

    babelHelpers.classCallCheck(this, Foo);

    if (condition) {
      _this2 = babelHelpers.possibleConstructorReturn(this, (Foo.__proto__ || Object.getPrototypeOf(Foo)).call(this));

      _initialiseProps(babelHelpers.assertThisInitialized(babelHelpers.assertThisInitialized(_this2)));
    } else {
      _this2 = babelHelpers.possibleConstructorReturn(this, (Foo.__proto__ || Object.getPrototypeOf(Foo)).call(this));

      _initialiseProps(babelHelpers.assertThisInitialized(babelHelpers.assertThisInitialized(_this2)));
    }

    return babelHelpers.possibleConstructorReturn(_this2);
  }

  return Foo;
}(Bar);

_bar = babelHelpers.classPrivateFieldKey("bar");

var _initialiseProps = function (_this) {
  Object.defineProperty(_this, _bar, {
    writable: true,
    value: "foo"
  });
};
