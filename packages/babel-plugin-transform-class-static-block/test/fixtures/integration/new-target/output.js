class Base {
  constructor() {
    var _Class;
    this.Foo = (_Class = class {}, _Class.foo = void 0, _Class);
  }
}
expect(new Base().Foo.foo).toBe(undefined);
