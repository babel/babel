class A {
  static foo = 0;
  static {
    babelHelpers.defineProperty(this, "name", void 0);
  }
  static bar;
  static {
    babelHelpers.defineProperty(this, "length", 1);
  }
}
