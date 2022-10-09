const dec = () => {};
class Foo {
  static #A;
  static get #a() {
    return this.#A;
  }
  static set #a(v) {
    this.#A = v;
  }
  static #B = 123;
  static get #b() {
    return this.#B;
  }
  static set #b(v) {
    this.#B = v;
  }
}
