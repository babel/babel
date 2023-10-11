class Foo {
  static #_ = 42;
  // static block can not be transformed as `#_` here
  static #_2 = this.foo = this.#_;
}
expect(Foo.foo).toBe(42);
