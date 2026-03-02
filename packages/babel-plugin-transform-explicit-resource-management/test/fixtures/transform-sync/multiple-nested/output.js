try {
  var _usingCtx = babelHelpers.usingCtx();
  const x = _usingCtx.u(obj);
  try {
    var _usingCtx2 = babelHelpers.usingCtx();
    const y = _usingCtx2.u(call(() => {
      try {
        var _usingCtx3 = babelHelpers.usingCtx();
        const z = _usingCtx3.u(obj);
        return z;
      } catch (_) {
        _usingCtx3.e = _;
      } finally {
        _usingCtx3.d();
      }
    }));
    stmt;
  } catch (_) {
    _usingCtx2.e = _;
  } finally {
    _usingCtx2.d();
  }
  stmt;
} catch (_) {
  _usingCtx.e = _;
} finally {
  _usingCtx.d();
}
