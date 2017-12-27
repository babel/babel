class Bar {}

class Foo extends Bar {
  constructor() {
    const fn = () => this;
    super();
    fn();
  }
}

new Foo();
