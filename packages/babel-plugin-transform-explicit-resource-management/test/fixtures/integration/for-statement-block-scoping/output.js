try {
  var _usingCtx = babelHelpers.usingCtx();
  var x = _usingCtx.u(a);
  var _loop = function () {
    var y = x;
    fns.push(() => y);
  };
  for (; i < 1; i++) {
    _loop();
  }
} catch (_) {
  _usingCtx.e = _;
} finally {
  _usingCtx.d();
}
