export default function fn() {}
try {
  var _usingCtx = babelHelpers.usingCtx();
  var x = _usingCtx.u(null);
} catch (_) {
  _usingCtx.e = _;
} finally {
  _usingCtx.d();
}
