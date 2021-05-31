var _foo = /*#__PURE__*/new WeakMap();

class A {
  constructor() {
    _foo.set(this, {
      writable: true,
      value: void 0
    });
  }

}

(() => {
  register(A, _foo.has(A));
})();
