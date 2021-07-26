class Foo extends Bar {
  constructor(...args) {
    super(...args);
    babelHelpers.defineProperty(this, "bar", "foo");
  }

}
