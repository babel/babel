class Base {
  method() {}
}

class Foo extends Base {
  constructor() {
    super();

    if (true) {
      let Foo;
      super.method();
    }
  }

  method() { }
}