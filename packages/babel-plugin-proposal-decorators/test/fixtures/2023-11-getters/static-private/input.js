const dec = () => {}; 
class Foo {
  static value = 1;

  @dec
  static get #a() {
    return this.value;
  }

  static getA() {
    return this.#a;
  }
}
