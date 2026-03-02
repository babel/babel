class C {
  static {
    babelHelpers.defineProperty(this, "p", (() => magic(this))());
    babelHelpers.defineProperty(this, "q", 2);
  }
}
