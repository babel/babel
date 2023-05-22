const dec = () => {};
class Foo {
  static #A;
  static get #a() {
    return Foo.#A;
  }
  static set #a(v) {
    Foo.#A = v;
  }
  static #B = 123;
  static get #b() {
    return Foo.#B;
  }
  static set #b(v) {
    Foo.#B = v;
  }
}
