const dec = () => {}; 
class Foo {
  @dec #x() {}

  bar() {
    ({ x: this.#x } = this.baz);
  }
}
