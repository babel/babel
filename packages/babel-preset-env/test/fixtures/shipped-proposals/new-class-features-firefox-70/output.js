var _A;
var _foo = /*#__PURE__*/new WeakMap();
class A {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _foo, {
      writable: true,
      value: void 0
    });
  }
}
_A = A;
register(_A, _foo.has(babelHelpers.checkInRHS(_A)));
