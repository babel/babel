class Foo extends Bar {
  constructor() {
    foo((super(), this.bar = "foo", this));
  }
}
