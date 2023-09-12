try {
  var _usingCtx = babelHelpers.usingCtx();
  const a = _usingCtx.using(1);
  const b = _usingCtx.using(2, true);
  const c = _usingCtx.using(3);
} catch (_) {
  _usingCtx.e = _;
} finally {
  await _usingCtx.dispose();
}
