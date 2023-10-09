for (const _x of y) try {
  //u: using(obj, isAwait), d: dispose()
  var _usingCtx = babelHelpers.usingCtx();
  const x = _usingCtx.u(_x);
  doSomethingWith(x);
} catch (_) {
  _usingCtx.e = _;
} finally {
  _usingCtx.d();
}
