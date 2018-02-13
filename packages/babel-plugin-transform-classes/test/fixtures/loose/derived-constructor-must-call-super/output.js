var Bar = function Bar() {};

var Foo =
/*#__PURE__*/
function (_Bar) {
  babelHelpers.inheritsLoose(Foo, _Bar);

  function Foo() {
    var _this;

    return babelHelpers.assertThisInitialized(_this);
  }

  return Foo;
}(Bar);
