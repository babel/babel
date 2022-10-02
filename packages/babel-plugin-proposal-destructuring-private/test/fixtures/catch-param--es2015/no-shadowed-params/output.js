var x;
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
  x = "x";
  try {
    throw new C();
  } catch (_e) {
    let x = babelHelpers.classPrivateFieldGet(_e, _x);
  }
})();
