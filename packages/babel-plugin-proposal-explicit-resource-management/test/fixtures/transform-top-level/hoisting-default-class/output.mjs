export { C as default };
try {
  //u: using(obj, isAwait), d: dispose()
  var _usingCtx = babelHelpers.usingCtx();
  var x = _usingCtx.u(null);
  var C = class {};
} catch (_) {
  _usingCtx.e = _;
} finally {
  _usingCtx.d();
}
