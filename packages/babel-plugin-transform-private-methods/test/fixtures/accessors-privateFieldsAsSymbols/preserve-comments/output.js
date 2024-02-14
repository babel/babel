var _C_brand = /*#__PURE__*/Symbol("a");
class C {
  constructor() {
    /* before get a */
    Object.defineProperty(this, _C_brand, {
      get: _get_a,
      set: _set_a
    });
  }
  /* after set a */
}
function _get_a() {
  return 42;
}
/* after get a */
/* before set a */
function _set_a(v) {}
