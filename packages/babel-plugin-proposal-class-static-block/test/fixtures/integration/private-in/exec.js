class Foo {
  static #bar = 21;
  static {
    this.foo = #bar in this;
  }
}
expect(Foo.foo).toBe(true);
