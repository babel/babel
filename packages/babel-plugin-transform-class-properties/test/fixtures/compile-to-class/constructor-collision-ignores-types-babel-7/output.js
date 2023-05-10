class C {
  constructor(T) {
    // Output should not use `_initialiseProps`
    babelHelpers.defineProperty(this, "y", 0);
  }
}
