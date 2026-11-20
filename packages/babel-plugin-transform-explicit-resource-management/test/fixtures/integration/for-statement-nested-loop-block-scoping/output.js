var _loop = function () {
  try {
    var _usingCtx = babelHelpers.usingCtx();
    var x = _usingCtx.u(R(k));
    for (;;) {
      fns.push(() => x);
      break;
    }
  } catch (_) {
    _usingCtx.e = _;
  } finally {
    _usingCtx.d();
  }
};
for (var k = 0; k < 2; k++) {
  _loop();
}
