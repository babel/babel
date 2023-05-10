class C {
  constructor(T) {
    // Output should not use `_initialiseProps`
    babelHelpers.defineProperty(this, "x", void 0);
    babelHelpers.defineProperty(this, "y", 0);
  }
}
