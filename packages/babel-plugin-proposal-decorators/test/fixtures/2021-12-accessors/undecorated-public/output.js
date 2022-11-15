var _computedKey;
const dec = () => {};
_computedKey = 'c';
class Foo {
  #A;
  get a() {
    return this.#A;
  }
  set a(v) {
    this.#A = v;
  }
  #B = 123;
  get b() {
    return this.#B;
  }
  set b(v) {
    this.#B = v;
  }
  #C = 456;
  get [_computedKey]() {
    return this.#C;
  }
  set [_computedKey](v) {
    this.#C = v;
  }
}
