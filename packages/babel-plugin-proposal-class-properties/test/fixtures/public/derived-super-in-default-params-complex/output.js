class Foo extends Bar {
  constructor(x = test ? (() => (super(), babelHelpers.defineProperty(this, "bar", "foo"), this))() : 0) {}
}
