const dec = () => {};
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
  get ['c']() {
    return this.#C;
  }
  set ['c'](v) {
    this.#C = v;
  }
}
