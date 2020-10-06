let Foo;
Foo = class Foo {
  static _init() {
    this.foo = 42;
    delete this._init;
    return this;
  }

}._init();
expect(Foo.foo).toBe(42);
