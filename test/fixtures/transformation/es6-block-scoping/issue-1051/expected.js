"use strict";

foo.func1 = function () {
  if (cond1) {
    for (;;) {
      if (cond2) {
        var _ret = (function () {
          var func2 = function () {};

          var func3 = function () {};

          func4(function () {
            func2();
          });
          return "break";
        })();

        if (_ret === "break") break;
      }
    }
  }
};
