class Bar {}

class Foo extends Bar {
  constructor() {
    if (eval("false")) super();
  }
}
