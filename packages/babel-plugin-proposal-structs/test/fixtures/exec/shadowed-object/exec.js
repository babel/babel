function f(Object) {
  struct S {
    m() {}
  }
  return S;
}
let called = false;
const S = f({
  seal() {
    called = true;
  },
});
expect(called).toBe(false);
expect(globalThis.Object.isSealed(S.prototype)).toBe(true);
