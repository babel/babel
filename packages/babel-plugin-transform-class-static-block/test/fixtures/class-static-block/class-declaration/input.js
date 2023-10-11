class Foo {
  static bar = 42;
  static {
    this.foo = this.bar;
  }
}
expect(Foo.foo).toBe(42);
