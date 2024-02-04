if (test) try {
  var _usingCtx = babelHelpers.usingCtx();
  const x = _usingCtx.u(obj);
  doSomethingWith(x);
} catch (_) {
  _usingCtx.e = _;
} finally {
  _usingCtx.d();
}
