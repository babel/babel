var _computedKey;
const dec = () => {};
_computedKey = 'c';
class Foo {
  static #A;
  static get a() {
    return this.#A;
  }
  static set a(v) {
    this.#A = v;
  }
  static #B = 123;
  static get b() {
    return this.#B;
  }
  static set b(v) {
    this.#B = v;
  }
  static #C = 456;
  static get [_computedKey]() {
    return this.#C;
  }
  static set [_computedKey](v) {
    this.#C = v;
  }
}
