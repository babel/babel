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
Foo = class Foo {
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
};
export default class _Class {
  static #A;
  static get #a() {
    return _Class.#A;
  }
  static set #a(v) {
    _Class.#A = v;
  }
  static #B = 123;
  static get #b() {
    return _Class.#B;
  }
  static set #b(v) {
    _Class.#B = v;
  }
}
