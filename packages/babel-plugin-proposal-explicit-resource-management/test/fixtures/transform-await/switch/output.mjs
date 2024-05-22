async function f() {
  try {
    var _usingCtx = babelHelpers.usingCtx();
    switch (v) {
      case 0:
        const x = _usingCtx.a(0);
        break;
      default:
        const y = _usingCtx.a(1);
        break;
    }
  } catch (_) {
    _usingCtx.e = _;
  } finally {
    await _usingCtx.d();
  }
}
