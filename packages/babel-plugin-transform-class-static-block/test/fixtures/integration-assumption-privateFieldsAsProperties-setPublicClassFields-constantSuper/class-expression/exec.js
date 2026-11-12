class Foo {
  static {
    this.foo = 42;
  }
}
expect(Foo.foo).toBe(42);
