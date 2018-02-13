class Bar {}

class Foo extends Bar {
  constructor() {
    const fn = () => super();
    fn();
  }
}
