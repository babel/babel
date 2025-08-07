export class Foo extends Bar {
  constructor() {
    super(...arguments);
    babelHelpers.defineProperty(this, "test", args);
  }
}
babelHelpers.defineProperty(Foo, "foo", {});
