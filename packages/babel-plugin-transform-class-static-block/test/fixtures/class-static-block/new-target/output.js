class Base {
  constructor() {
    var _staticBlock, _temp;
    this.Foo = (_temp = class {
      static #_ = _staticBlock = () => this.foo = new.target;
    }, _staticBlock(), _temp);
  }
}
expect(new Base().Foo.foo).toBe(undefined);
