function fn() {
  return _fn.apply(this, arguments);
}
function _fn() {
  _fn = babelHelpers.asyncToGenerator(function* () {
    yield 0;
    try {
      //u: using(obj, isAwait), d: dispose()
      var _usingCtx = babelHelpers.usingCtx();
      const x = _usingCtx.u(y, true);
      yield 1;
    } catch (_) {
      _usingCtx.e = _;
    } finally {
      yield _usingCtx.d();
    }
  });
  return _fn.apply(this, arguments);
}
