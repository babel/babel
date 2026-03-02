const sym = Symbol();
const sym1 = Symbol();
class A {
  constructor() {
    babelHelpers.defineProperty(this, sym, void 0);
    babelHelpers.defineProperty(this, sym1, void 0);
  }
}
