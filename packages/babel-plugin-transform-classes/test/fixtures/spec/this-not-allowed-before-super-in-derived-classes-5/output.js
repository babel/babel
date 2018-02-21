var Bar = function Bar() {
  babelHelpers.classCallCheck(this, Bar);
};

var Foo =
/*#__PURE__*/
function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    var _this;

    babelHelpers.classCallCheck(this, Foo);
    Foo[babelHelpers.assertThisInitialized(_this)];
    return babelHelpers.possibleConstructorReturn(_this);
  }

  return Foo;
}(Bar);
