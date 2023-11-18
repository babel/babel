export { x, y };
try {
  var _usingCtx = babelHelpers.usingCtx();
  var x = _usingCtx.u(A);
  var y = _usingCtx.u(B, true);
} catch (_) {
  _usingCtx.e = _;
} finally {
  await _usingCtx.d();
}
