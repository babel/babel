try {
  var _usingCtx = babelHelpers.usingCtx();
  before;
  var x = _usingCtx.u(fn());
  doSomethingWith(x);
  after;
} catch (_) {
  _usingCtx.e = _;
} finally {
  _usingCtx.d();
}
