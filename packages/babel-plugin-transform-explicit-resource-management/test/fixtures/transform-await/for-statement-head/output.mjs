async function fn() {
  try {
    var _usingCtx = babelHelpers.usingCtx();
    const x = _usingCtx.a(a);
    for (; i < 1; i++) {
      doSomethingWith(x);
    }
  } catch (_) {
    _usingCtx.e = _;
  } finally {
    await _usingCtx.d();
  }
}
