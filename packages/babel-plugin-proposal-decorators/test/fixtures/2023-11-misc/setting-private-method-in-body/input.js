const dec = () => {};
class Foo {
  @dec #x() {
    this.#x = 123;
  }
}
