class Foo {
  constructor() {
    babelHelpers.defineProperty(this, "bar", "bar");
  }

}

babelHelpers.defineProperty(Foo, "foo", "foo");
