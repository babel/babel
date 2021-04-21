var _foo = new WeakMap();

class A {
  constructor() {
    _foo.set(this, {
      writable: true,
      value: void 0
    });
  }

}

var _ = {
  writable: true,
  value: (() => {
    register(A, _foo.has(A));
  })()
};
