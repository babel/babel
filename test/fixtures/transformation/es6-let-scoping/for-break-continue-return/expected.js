"use strict";

_loop: for (var i in nums) {
  var _ret = (function (i) {
    fns.push(function () {
      return i;
    });
    if (i === 1) {
      return "continue";
    } else if (i === 2) {
      return "break";
    } else if (i === 3) {
      return {
        v: i
      };
    }
  })(i);

  switch (_ret) {
    case "break": break _loop;
    case "continue": continue _loop;
    default:
      if (typeof _ret === "object") return _ret.v;
  }
}
