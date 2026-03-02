for await (const _x of y) try {
  var _usingCtx = babelHelpers.usingCtx();
  const x = _usingCtx.u(_x);
  doSomethingWith(x);
} catch (_) {
  _usingCtx.e = _;
} finally {
  _usingCtx.d();
}
