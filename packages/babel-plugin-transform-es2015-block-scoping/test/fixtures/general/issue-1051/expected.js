var _ref = function () {
  function func2() {}
  function func3() {}
  func4(function () {
    func2();
  });
  return "break";
};

foo.func1 = function () {
  if (cond1) {
    for (;;) {
      if (cond2) {
        var _ret = _ref();

        if (_ret === "break") break;
      }
    }
  }
};