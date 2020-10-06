class Foo extends class Bar {
  static {
    this.bar = 21;
  }
} {
  static {
    this.foo = 2 * this.bar;
  }
}
expect(Foo.foo).toBe(42);
