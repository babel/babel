class Foo extends class extends class Base {
  static {
    this.qux = 21;
  }
} {
  static {
    this.bar = 21;
  }
} {
  static {
    this.foo = this.bar + this.qux;
  }
}
expect(Foo.foo).toBe(42);
