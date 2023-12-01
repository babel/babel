var _computedKey;
const dec = () => {};
_computedKey = 'c';
class Foo {
  static #A;
  static get a() {
    return Foo.#A;
  }
  static set a(v) {
    Foo.#A = v;
  }
  static #B = 123;
  static get b() {
    return Foo.#B;
  }
  static set b(v) {
    Foo.#B = v;
  }
  static #C = 456;
  static get [_computedKey]() {
    return Foo.#C;
  }
  static set [_computedKey](v) {
    Foo.#C = v;
  }
}
