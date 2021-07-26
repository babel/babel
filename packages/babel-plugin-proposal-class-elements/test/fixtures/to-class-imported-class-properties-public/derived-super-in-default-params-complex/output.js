class Foo extends Bar {
  constructor(x = test ? (() => {
    var _temp;

    return _temp = super(), babelHelpers.defineProperty(this, "bar", "foo"), _temp;
  })() : 0) {}

}
