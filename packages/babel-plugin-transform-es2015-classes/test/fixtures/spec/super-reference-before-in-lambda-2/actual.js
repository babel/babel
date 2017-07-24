class Foo extends Bar {
  constructor() {
    const t = () => super.test()
    super.foo();
    super();
  }
}
