const dec = () => {}; 
class Foo {
  @dec #x() {}

  bar() {
    for (this.#x of this.baz);
  }
}
