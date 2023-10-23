class A {
  static #x = doSomething(A);
  static #y = 0;
  static {
    babelHelpers.defineProperty(this, "y", 1);
  }
}
