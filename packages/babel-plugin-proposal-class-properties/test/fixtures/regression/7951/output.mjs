export class Foo extends Bar {
  constructor(..._args2) {
    var _temp;

    return _temp = super(..._args2), babelHelpers.defineProperty(this, "test", args), _temp;
  }

}
babelHelpers.defineProperty(Foo, "foo", {});
