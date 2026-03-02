class Foo {
  static #_() {};
  // static block can not be transformed as `#_` here
  static {
    this.foo = this.#_;
  }
}
expect(Foo.foo).toBe(42);
