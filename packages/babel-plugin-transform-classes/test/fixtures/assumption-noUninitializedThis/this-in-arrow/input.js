class A extends B {
  constructor() {
    const fn = () => this;
    super();
    fn();
  }
}
