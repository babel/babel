const dec = () => {};
class Foo {
  @dec #x() {
    class Nested {
      static #x;
      static set x(v) {
        this.#x = v;
      }
    }
  }
}
