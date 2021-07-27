var _x = /*#__PURE__*/new WeakMap();

class C {
  constructor() {
    _x.set(this, void 0);
  }

  y = babelHelpers.classPrivateFieldGet2(this, _x);
}

expect(() => {
  new C();
}).toThrow();
