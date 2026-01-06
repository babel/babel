foo.func1 = function () {
  if (cond1) {
    var _loop = function () {
        if (cond2) {
          func2 = function () {};
          func3 = function () {};
          func4(function () {
            func2();
          });
          return 1; // break
        }
      },
      func2,
      func3;
    for (;;) {
      if (_loop()) break;
    }
  }
};
