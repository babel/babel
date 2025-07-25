class Base {
  constructor() {
    this.Foo = class {
      static {
        this.foo = new.target;
      }
    }
  }
}
expect((new Base).Foo).toHaveProperty('foo', undefined);
