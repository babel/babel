class C {
  constructor() {
    /* before a */
    babelHelpers.defineProperty(this, "a", void 0);
  }
  /* after b */
}
/* after a */
/* before b */
babelHelpers.defineProperty(C, "b", void 0);
