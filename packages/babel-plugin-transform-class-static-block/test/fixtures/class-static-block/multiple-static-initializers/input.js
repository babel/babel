class Foo {
  static #bar = 21;
  static {
    this.foo = this.#bar;
    this.qux1 = this.qux;
  }
  static {
    if (foo) bar;
  }
  static qux = 21;
  static {
    this.qux2 = this.qux;
  }
}
