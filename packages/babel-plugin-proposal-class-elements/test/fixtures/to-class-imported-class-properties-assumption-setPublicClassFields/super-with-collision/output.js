class A {
  constructor(_force) {
    babelHelpers.defineProperty(this, "force", force);
    babelHelpers.defineProperty(this, "foo", super.method());
  }

}
