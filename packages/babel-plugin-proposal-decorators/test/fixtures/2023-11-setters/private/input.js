const dec = () => {}; 
class Foo {
  value = 1;

  @dec
  set #a(v) {
    return this.value = v;
  }

  setA(v) {
    this.#a = v;
  }
}
