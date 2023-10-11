const dec = () => {}; 
class Foo {
  value = 1;

  @dec
  get #a() {
    return this.value;
  }

  @dec
  set #a(v) {
    this.value = v;
  }

  getA() {
    return this.#a;
  }

  setA(v) {
    this.#a = v;
  }
}
