var _arr = /*#__PURE__*/new WeakMap();

class D {
  constructor() {
    _arr.set(this, void 0);
  }

  f() {
    for (const el of babelHelpers.classPrivateFieldGet2(this, _arr));
  }

}

var _p = /*#__PURE__*/new WeakMap();

class C {
  constructor() {
    _p.set(this, void 0);
  }

  m() {
    for (babelHelpers.classInstancePrivateFieldDestructureSet2(this, _p)._ of []);
  }

}

var _arr2 = /*#__PURE__*/new WeakMap();

class E {
  constructor() {
    _arr2.set(this, void 0);
  }

  f() {
    for (babelHelpers.classInstancePrivateFieldDestructureSet2(this, _arr2)._ of [1, 2]);
  }

}

var _ar = /*#__PURE__*/new WeakMap();

class F {
  constructor() {
    _ar.set(this, void 0);
  }

  g() {
    for (babelHelpers.classInstancePrivateFieldDestructureSet2(this, _ar)._ in [1, 2, 3]);
  }

}
