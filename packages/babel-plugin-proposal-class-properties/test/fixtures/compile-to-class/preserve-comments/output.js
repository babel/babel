class C {
  constructor() {
    /* before a */
    babelHelpers.defineProperty(this, "a", void 0);
  }
  /* after a */
  /* before b */
  /* after b */
}
babelHelpers.defineProperty(C, "b", void 0);
