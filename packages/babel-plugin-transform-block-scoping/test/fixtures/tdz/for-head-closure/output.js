function t() {
  var f = babelHelpers.temporalUndefined;
  var _loop = function (i) {
      () => i;
      if (i > 1) return {
        v: babelHelpers.temporalRef(f, "f")()
      };
    },
    _ret;
  for (var _i = 0, f = () => _i, i = _i;; i++) {
    _ret = _loop(i);
    if (_ret) return _ret.v;
  }
}
