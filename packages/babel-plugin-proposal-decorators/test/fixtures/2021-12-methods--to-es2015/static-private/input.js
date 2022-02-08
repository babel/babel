const dec = () => {}; 
class Foo {
  static value = 1;

  @dec
  static #a() {
    return this.value;
  }

  static callA() {
    return this.#a();
  }
}
