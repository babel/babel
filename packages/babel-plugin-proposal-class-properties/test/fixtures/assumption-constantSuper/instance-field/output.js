class A extends B {
  constructor(...args) {
    super(...args);
    babelHelpers.defineProperty(this, "foo", super.bar);
  }
}
