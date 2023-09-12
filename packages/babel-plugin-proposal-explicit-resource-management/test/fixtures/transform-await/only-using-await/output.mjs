try {
  var _usingCtx = babelHelpers.usingCtx();
  const x = _usingCtx.using(obj, true);
  stmt;
  const y = _usingCtx.using(obj, true),
    z = _usingCtx.using(obj, true);
  doSomethingWith(x, y);
} catch (_) {
  _usingCtx.e = _;
} finally {
  await _usingCtx.dispose();
}
