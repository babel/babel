class Bar {
  test() {}
}

class Foo extends Bar {
  constructor() {
    var t = () => super.test()
    super.foo();
    super();
  }
}
