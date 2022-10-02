class C {
  // Output should not use `_initialiseProps`

  constructor(T) {
    babelHelpers.defineProperty(this, "x", void 0);
    babelHelpers.defineProperty(this, "y", 0);
  }
}
