class Foo {
  static {
    this.foo = Foo.bar;
  }
  static bar = 42;
}
expect(Foo.foo).toBe(42);
