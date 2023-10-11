outer: while (t) {
  inner: while (t2) {
    var _loop = function (i) {
        later(function () {
          return i;
        });
        if (test1) return 0; // break outer
        else if (test2) return 1; // break inner
        else if (test3) return 2; // continue outer
        else if (test4) return 3; // continue inner
        else if (test5) return 4; // break
        else if (test6) return 5; // continue
      },
      _ret;
    for (var i = 0; i < 3; i++) {
      _ret = _loop(i);
      if (_ret === 0) break outer;
      if (_ret === 1) break inner;
      if (_ret === 2) continue outer;
      if (_ret === 3) continue inner;
      if (_ret === 4) break;
      if (_ret === 5) continue;
    }
  }
}
