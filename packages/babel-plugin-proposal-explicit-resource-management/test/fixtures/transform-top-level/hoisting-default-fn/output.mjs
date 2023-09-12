export default function fn() {}
try {
  var _usingCtx = babelHelpers.usingCtx();
  var x = _usingCtx.using(null);
} catch (_) {
  _usingCtx.e = _;
} finally {
  _usingCtx.dispose();
}
