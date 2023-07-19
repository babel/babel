var _class;
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
_class = C;
(() => {
  x = "x";
  try {
    throw new _class();
  } catch (_e) {
    let x = babelHelpers.classPrivateFieldGet(_e, _x);
  }
})();
