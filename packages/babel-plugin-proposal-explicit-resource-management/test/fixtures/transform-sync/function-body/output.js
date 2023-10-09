function fn() {
  try {
    //u: using(obj, isAwait), d: dispose()
    var _usingCtx = babelHelpers.usingCtx();
    const x = _usingCtx.u(obj);
    return doSomethingWith(x);
  } catch (_) {
    _usingCtx.e = _;
  } finally {
    _usingCtx.d();
  }
}
