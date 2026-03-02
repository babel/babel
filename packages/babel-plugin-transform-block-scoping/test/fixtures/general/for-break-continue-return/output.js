(function () {
  var _loop = function (i) {
      fns.push(function () {
        return i;
      });
      if (i === 1) {
        return 0; // continue
      } else if (i === 2) {
        return 1; // break
      } else if (i === 3) {
        return {
          v: i
        };
      }
    },
    _ret;
  for (var i in nums) {
    _ret = _loop(i);
    if (_ret === 0) continue;
    if (_ret === 1) break;
    if (_ret) return _ret.v;
  }
})();
