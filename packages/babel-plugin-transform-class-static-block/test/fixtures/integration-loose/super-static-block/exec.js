class Foo extends class {
  static {
    this.bar = 42;
  }
} {
  static bar = 21;
  static {
    this.foo = super.bar;
  }
}
expect(Foo.foo).toBe(42);
