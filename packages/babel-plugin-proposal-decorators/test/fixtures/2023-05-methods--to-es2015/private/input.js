const dec = () => {}; 
class Foo {
  value = 1;

  @dec
  #a() {
    return this.value;
  }

  callA() {
    return this.#a();
  }
}
