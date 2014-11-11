"use strict";

_loop: for (var i in nums) {
  var _ret = (function (i) {
    fns.push(function () {
      return i;
    });
    return "break";
  })(i);

  if (_ret === "break") break _loop;
}
