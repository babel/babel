class Foo {
  static #bar = 21;
  static {
    this.foo = this.#bar + this.qux;
  }
  static qux = 21;
}
expect(Foo.foo).toBe(42);
