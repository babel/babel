export class Foo extends Bar {
  constructor(..._args) {
    super(..._args);
    babelHelpers.defineProperty(this, "test", args);
  }

}
babelHelpers.defineProperty(Foo, "foo", {});
