var Foo =
/*#__PURE__*/
function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo(options) {
    babelHelpers.classCallCheck(this, Foo);
    var parentOptions = {};

    parentOptions.init = function () {
      this;
    };

    return babelHelpers.possibleConstructorReturn(this, babelHelpers.constructSuperInstance(Foo, [parentOptions], this));
  }

  return Foo;
}(Bar);
