class Bar {
  test() {}
}

class Foo extends Bar {
  constructor() {
    const t = () => super.test()
    super();
    t();
  }
}
