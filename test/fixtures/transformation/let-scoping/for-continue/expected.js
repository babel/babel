"use strict";

_loop: for (var i in nums) {
  var _ret = (function (i) {
    fns.push(function () {
      return i;
    });
    return "continue";
  })(i);

  if (_ret === "continue") continue _loop;
}
