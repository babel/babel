let getFoo;
class Foo {
  static #foo() { return 42 };
  static {
    getFoo = () => this.#foo();
  }
}
expect(getFoo()).toBe(42);
