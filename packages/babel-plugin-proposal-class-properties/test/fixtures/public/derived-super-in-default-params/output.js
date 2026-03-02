class Foo extends Bar {
  constructor(x = (() => {
    var _temp;

    return _temp = super(), babelHelpers.defineProperty(this, "bar", "foo"), _temp;
  })()) {}

}
