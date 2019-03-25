export class Foo extends Bar {
  constructor(..._args) {
    try {
      super(..._args);
    } finally {
      babelHelpers.defineProperty(this, "test", args);
    }
  }

}
babelHelpers.defineProperty(Foo, "foo", {});
