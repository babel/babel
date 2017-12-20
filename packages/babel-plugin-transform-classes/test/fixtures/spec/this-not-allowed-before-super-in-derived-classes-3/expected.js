var Foo =
/*#__PURE__*/
function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    var _this;

    babelHelpers.classCallCheck(this, Foo);

    var fn = () => babelHelpers.assertThisInitialized(_this);

    fn();
    return _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.constructSuperInstance(Foo, [], this));
  }

  return Foo;
}(Bar);
