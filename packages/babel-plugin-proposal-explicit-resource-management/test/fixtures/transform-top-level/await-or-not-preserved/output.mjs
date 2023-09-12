export { x, y };
try {
  var _usingCtx = babelHelpers.usingCtx();
  var x = _usingCtx.using(A);
  var y = _usingCtx.using(B, true);
} catch (_) {
  _usingCtx.e = _;
} finally {
  await _usingCtx.dispose();
}
