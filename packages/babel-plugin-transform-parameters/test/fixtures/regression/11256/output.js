class A {
  constructor() {
    babelHelpers.defineProperty(this, "a", b => {
      {
        b = {}.b;
      }
    });
  }
}
