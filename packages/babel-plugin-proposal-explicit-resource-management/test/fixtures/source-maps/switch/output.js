function f() {
  try {
    var _usingCtx = babelHelpers.usingCtx();
    switch (v) {
      case 0:
        const x = _usingCtx.u(0);
        break;
      default:
        const y = _usingCtx.u(1);
        break;
    }
  } catch (_) {
    _usingCtx.e = _;
  } finally {
    _usingCtx.d();
  }
  ;
}
