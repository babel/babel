class Foo {
  static {
    this.foo = this.bar;
  }
  static bar = 42;
}
expect(Foo.foo).toBe(42);
