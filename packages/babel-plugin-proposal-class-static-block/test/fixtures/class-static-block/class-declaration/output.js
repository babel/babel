class Foo {
  static bar = 42;
  static #_ = this.foo = this.bar;
}
expect(Foo.foo).toBe(42);
