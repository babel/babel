function fn() {
  return _fn.apply(this, arguments);
}
function _fn() {
  _fn = babelHelpers.asyncToGenerator(function* () {
    yield 0;
    try {
      var _usingCtx = babelHelpers.usingCtx();
      const x = _usingCtx.using(y, true);
      yield 1;
    } catch (_) {
      _usingCtx.e = _;
    } finally {
      yield _usingCtx.dispose();
    }
  });
  return _fn.apply(this, arguments);
}
