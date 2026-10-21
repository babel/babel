var f = [];
var _loop = function (i) {
    f.push(() => i);
    var _loop2 = function (j) {
        f.push(() => i * 10 + j);
        if (i === 1) return {
          v: 0
        }; // continue a
        if (i === 2) return {
          v: 1
        }; // continue b
        if (i === 3) return 0; // break d
        if (i === 4) return {
          v: 2
        }; // break b
        if (j === 0) return 1; // continue c
      },
      _ret2;
    c: d: for (var j = 0; j < 2; j++) {
      _ret2 = _loop2(j);
      if (_ret2 === 0) break d;
      if (_ret2 === 1) continue c;
      if (_ret2) return _ret2.v;
    }
  },
  _ret;
a: b: for (var i = 0; i < 6; i++) {
  _ret = _loop(i);
  if (_ret === 0) continue a;
  if (_ret === 1) continue b;
  if (_ret === 2) break b;
}
