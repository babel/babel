function t() {
  var i = babelHelpers.temporalUndefined;
  var _loop = function (i) {
      () => i;
      return {
        v: f()
      };
    },
    _ret;
  for (var f = () => babelHelpers.temporalRef(i, "i"), i = 0;;) {
    _ret = _loop(i);
    if (_ret) return _ret.v;
  }
}
