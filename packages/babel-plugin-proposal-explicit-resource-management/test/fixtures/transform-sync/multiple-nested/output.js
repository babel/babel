try {
  var _usingCtx = babelHelpers.usingCtx();
  const x = _usingCtx.using(obj);
  try {
    var _usingCtx2 = babelHelpers.usingCtx();
    const y = _usingCtx2.using(call(() => {
      try {
        var _usingCtx3 = babelHelpers.usingCtx();
        const z = _usingCtx3.using(obj);
        return z;
      } catch (_) {
        _usingCtx3.e = _;
      } finally {
        _usingCtx3.dispose();
      }
    }));
    stmt;
  } catch (_) {
    _usingCtx2.e = _;
  } finally {
    _usingCtx2.dispose();
  }
  stmt;
} catch (_) {
  _usingCtx.e = _;
} finally {
  _usingCtx.dispose();
}
