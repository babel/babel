function fn() {
  try {
    var _usingCtx = babelHelpers.usingCtx();
    const x = _usingCtx.using(obj);
    return doSomethingWith(x);
  } catch (_) {
    _usingCtx.e = _;
  } finally {
    _usingCtx.dispose();
  }
}
