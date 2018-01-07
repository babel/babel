class Foo extends Bar {
  constructor() {
    const fn = () => this;
    fn();
    super();
  }
}
