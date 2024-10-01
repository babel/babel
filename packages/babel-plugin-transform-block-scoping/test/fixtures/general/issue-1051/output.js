foo.func1 = function () {
  if (cond1) {
    var _loop = function () {
      if (cond2) {
        function func2() {}
        function func3() {}
        func4(function () {
          func2();
        });
        return 1; // break
      }
    };
    for (;;) {
      if (_loop()) break;
    }
  }
};
