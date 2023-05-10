class Base {
  constructor() {
    this.Foo = class {
      static #_ = this.foo = new.target;
    };
  }
}
expect(new Base().Foo.foo).toBe(undefined);
