for (const _x of y) try {
  var _usingCtx = babelHelpers.usingCtx();
  const x = _usingCtx.using(_x);
  doSomethingWith(x);
} catch (_) {
  _usingCtx.e = _;
} finally {
  _usingCtx.dispose();
}
