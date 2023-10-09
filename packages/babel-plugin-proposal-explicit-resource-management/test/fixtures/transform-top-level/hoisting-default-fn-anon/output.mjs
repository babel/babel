export default function fn() {}
try {
  //u: using(obj, isAwait), d: dispose()
  var _usingCtx = babelHelpers.usingCtx();
  var x = _usingCtx.u(null);
} catch (_) {
  _usingCtx.e = _;
} finally {
  _usingCtx.d();
}
