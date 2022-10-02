class Foo extends Bar {
  constructor(x = (() => (super(), babelHelpers.defineProperty(this, "bar", "foo"), this))()) {}
}
