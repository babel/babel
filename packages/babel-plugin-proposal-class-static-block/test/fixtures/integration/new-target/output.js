class Base {
  constructor() {
    var _class;
    this.Foo = (_class = class {}, _class.foo = void 0, _class);
  }
}
expect(new Base().Foo.foo).toBe(undefined);
