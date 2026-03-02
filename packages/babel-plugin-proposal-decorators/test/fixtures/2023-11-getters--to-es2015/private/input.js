const dec = () => {}; 
class Foo {
  value = 1;

  @dec
  get #a() {
    return this.value;
  }

  getA() {
    return this.#a;
  }
}
