var _x = /*#__PURE__*/new WeakMap();

class C {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _x, {
      writable: true,
      value: void 0
    });
  }

}

(() => {
  try {
    throw new C();
  } catch (_e) {
    var x = babelHelpers.classPrivateFieldGet(_e, _x);
  }
})();
