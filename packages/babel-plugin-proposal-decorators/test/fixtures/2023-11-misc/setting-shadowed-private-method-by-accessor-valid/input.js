const dec = () => {};
class Foo {
  @dec #x() {
    class Nested {
      static accessor #x;
      static set x(v) {
        this.#x = v;
      }
    }
  }
}
