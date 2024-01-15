try {
  var _usingCtx = babelHelpers.usingCtx();
  stmt;
  const x = _usingCtx.u(obj);
  stmt;
  const y = _usingCtx.u(obj),
    z = _usingCtx.u(obj);
  stmt;
  const w = _usingCtx.u(obj);
  doSomethingWith(x, z);
} catch (_) {
  _usingCtx.e = _;
} finally {
  _usingCtx.d();
}
