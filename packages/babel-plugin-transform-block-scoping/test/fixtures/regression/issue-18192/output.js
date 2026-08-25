function run() {
  var _loop = function (i) {
      return {
        v: () => i
      };
    },
    _ret;
  for (var i = 0; i < 2; i++) {
    _ret = _loop(i);
    if (_ret) return _ret.v;
  }
}
var reader = run();
