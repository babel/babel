const dec = () => {}; 
class Foo {
  static value = 1;

  @dec
  static set #a(v) {
    return this.value = v;
  }

  static setA(v) {
    this.#a = v;
  }
}
