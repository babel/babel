class Foo extends Bar {
  constructor() {
    super();
    class X {
      [(() => {
        let Foo;
        super.method();
      })()]() {}
    }
  }
}