(function () {
  var _ret,
    _loop = function (i) {
      fns.push(function () {
        return i;
      });
      if (i === 1) {
        // continue
        return 0;
      } else if (i === 2) {
        // break
        return 1;
      } else if (i === 3) {
        return {
          v: i
        };
      }
    };
  for (var i in nums) {
    _ret = _loop(i);
    if (_ret === 0) continue;
    if (_ret === 1) break;
    if (_ret) return _ret.v;
  }
})();
