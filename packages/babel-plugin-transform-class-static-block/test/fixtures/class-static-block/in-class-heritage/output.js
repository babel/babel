class Foo extends class extends class Base {
  static #_ = this.qux = 21;
} {
  static #_ = this.bar = 21;
} {
  static #_ = this.foo = this.bar + this.qux;
}
expect(Foo.foo).toBe(42);
