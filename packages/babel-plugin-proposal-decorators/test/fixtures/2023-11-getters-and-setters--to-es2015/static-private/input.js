const dec = () => {}; 
class Foo {
  static value = 1;

  @dec
  static get #a() {
    return this.value;
  }

  @dec
  static set #a(v) {
    this.value = v;
  }

  static getA() {
    return this.#a;
  }

  static setA(v) {
    this.#a = v;
  }
}
