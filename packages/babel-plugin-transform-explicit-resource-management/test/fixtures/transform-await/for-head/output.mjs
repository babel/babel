for (const _x of y) try {
  var _usingCtx = babelHelpers.usingCtx();
  const x = _usingCtx.a(_x);
  doSomethingWith(x);
} catch (_) {
  _usingCtx.e = _;
} finally {
  await _usingCtx.d();
}
for await (const _x2 of y) try {
  var _usingCtx2 = babelHelpers.usingCtx();
  const x = _usingCtx2.a(_x2);
  doSomethingWith(x);
} catch (_) {
  _usingCtx2.e = _;
} finally {
  await _usingCtx2.d();
}
for await (const _x3 of y) try {
  var _usingCtx3 = babelHelpers.usingCtx();
  const x = _usingCtx3.u(_x3);
  doSomethingWith(x);
} catch (_) {
  _usingCtx3.e = _;
} finally {
  _usingCtx3.d();
}
