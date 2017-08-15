class C {
  // Output should not use `_initialiseProps`
  constructor(T) {
    Object.defineProperty(this, "x", {
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "y", {
      enumerable: true,
      writable: true,
      value: 0
    });
  }

}
