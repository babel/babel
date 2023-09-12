try {
  var _usingCtx = babelHelpers.usingCtx();
  const x = _usingCtx.u(obj, true);
  stmt;
  const y = _usingCtx.u(obj, true),
    z = _usingCtx.u(obj, true);
  doSomethingWith(x, y);
} catch (_) {
  _usingCtx.e = _;
} finally {
  await _usingCtx.d();
}
