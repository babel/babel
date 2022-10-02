class C {
  // Output should not use `_initialiseProps`

  constructor(T) {
    babelHelpers.defineProperty(this, "y", 0);
  }
}
