var _foo = /*#__PURE__*/new WeakMap();
class A {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _foo, {
      writable: true,
      value: void 0
    });
  }
}
register(A, _foo.has(babelHelpers.checkInRHS(A)));
