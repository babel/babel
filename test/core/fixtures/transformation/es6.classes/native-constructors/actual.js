class Foo extends Array {

}

class Bar extends Array {
  constructor() {
    super();
    this.foo = "bar";
  }
}

class Baz extends Array {
  constructor() {
    super();
    (() => this)
  }
}
