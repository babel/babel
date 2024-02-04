class A {
  static bar = 1;
  static {
    doSomething(A);
  }
  static {
    babelHelpers.defineProperty(this, "foo", 2);
  }
}
