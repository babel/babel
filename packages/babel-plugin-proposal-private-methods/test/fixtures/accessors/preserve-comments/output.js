var _a = /*#__PURE__*/new WeakMap();
class C {
  constructor() {
    /* before get a */
    babelHelpers.classPrivateFieldInitSpec(this, _a, {
      get: _get_a,
      set: _set_a
    });
  }
  /* after get a */
  /* before set a */
  /* after set a */
}
function _get_a() {
  return 42;
}
function _set_a(v) {}
