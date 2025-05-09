class A extends B {
  constructor() {
    super(...arguments);
    babelHelpers.defineProperty(this, "foo", super.bar);
  }
}
