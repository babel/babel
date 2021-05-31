class Foo {
  static #bar = 21;
  static {
    this.foo = this.#bar;
    this.qux1 = this.qux;
  }
  static qux = 21;
  static {
    this.qux2 = this.qux;
  }
}
expect(Foo.foo).toBe(21);
expect(Foo.qux1).toBe(undefined);
expect(Foo.qux2).toBe(21);
