class A {
  static {
    doSomething(A);
  }
  static {
    babelHelpers.defineProperty(this, "foo", 2);
    babelHelpers.defineProperty(this, "name", 3);
  }
}
