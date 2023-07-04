foo.func1 = function () {
  if (cond1) {
    var _loop = function () {
      if (cond2) {
        var func2 = function () {};
        var func3 = function () {};
        func4(function () {
          func2();
        });
        // break
        return 1;
      }
    };
    for (;;) {
      if (_loop()) break;
    }
  }
};
