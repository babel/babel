const dec = () => {};
class Foo {
  #A;
  get #a() {
    return this.#A;
  }
  set #a(v) {
    this.#A = v;
  }
  #B = 123;
  get #b() {
    return this.#B;
  }
  set #b(v) {
    this.#B = v;
  }
}
