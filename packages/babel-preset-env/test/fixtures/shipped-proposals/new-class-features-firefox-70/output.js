var _class;
var _foo = /*#__PURE__*/new WeakMap();
class A {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _foo, {
      writable: true,
      value: void 0
    });
  }
}
_class = A;
register(_class, _foo.has(babelHelpers.checkInRHS(_class)));
