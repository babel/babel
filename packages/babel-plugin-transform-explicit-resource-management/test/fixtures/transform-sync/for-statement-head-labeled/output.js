try {
  var _usingCtx = babelHelpers.usingCtx();
  const x = _usingCtx.u(a);
  outer: inner: for (; i < 1; i++) {
    if (x) continue outer;
    break inner;
  }
} catch (_) {
  _usingCtx.e = _;
} finally {
  _usingCtx.d();
}
