var Foo = function (_Bar) {
  babelHelpers.inherits(Foo, _Bar);

  function Foo(options) {
    babelHelpers.classCallCheck(this, Foo);

    var parentOptions = {};
    parentOptions.init = function () {
      this;
    };
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.wrapCtor(Object.getPrototypeOf(Foo)).call(this, parentOptions));
  }

  return Foo;
}(Bar);
