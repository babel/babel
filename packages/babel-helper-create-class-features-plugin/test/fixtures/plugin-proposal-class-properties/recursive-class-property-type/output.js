const sym = Symbol();
class A {
  constructor() {
    babelHelpers.defineProperty(this, sym, void 0);
  }
}
