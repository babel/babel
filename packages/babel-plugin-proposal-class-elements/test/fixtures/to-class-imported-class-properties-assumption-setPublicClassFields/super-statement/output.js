class Foo extends Bar {
  constructor() {
    super();
    babelHelpers.defineProperty(this, "bar", "foo");
  }

}
