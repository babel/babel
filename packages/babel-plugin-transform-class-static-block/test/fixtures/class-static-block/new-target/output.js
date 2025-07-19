class Base {
  constructor() {
    var _staticBlock;
    this.Foo = (class {
      static #_ = _staticBlock = () => (this.foo = new.target, this);
    }, _staticBlock());
  }
}
expect(new Base().Foo.foo).toBe(undefined);
