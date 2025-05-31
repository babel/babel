try {
  var _usingCtx = babelHelpers.usingCtx();
  const x = _usingCtx.u(fn());
  doSomethingWith(x);
} catch (_) {
  _usingCtx.e = _;
} finally {
  _usingCtx.d();
}
