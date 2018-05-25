export class Foo extends Bar {
  constructor(..._args) {
    var _temp;

    return _temp = super(..._args), babelHelpers.defineProperty(this, "test", args), _temp;
  }

}
babelHelpers.defineProperty(Foo, "foo", {});
