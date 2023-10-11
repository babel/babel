let getFoo;
class Foo {
  static #foo = 42;
  static {
    getFoo = () => this.#foo;
  }
}
expect(getFoo()).toBe(42);
