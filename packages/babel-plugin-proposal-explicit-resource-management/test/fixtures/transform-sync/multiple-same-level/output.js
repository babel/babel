try {
  var _usingCtx = babelHelpers.usingCtx();
  stmt;
  const x = _usingCtx.using(obj);
  stmt;
  const y = _usingCtx.using(obj),
    z = _usingCtx.using(obj);
  stmt;
  const w = _usingCtx.using(obj);
  doSomethingWith(x, z);
} catch (_) {
  _usingCtx.e = _;
} finally {
  _usingCtx.dispose();
}
