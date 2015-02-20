"use strict";

(function () {
  for (var i in nums) {
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
      case "continue":
        continue;

      case "break":
        break;

      default:
        if (typeof _ret === "object") return _ret.v;
    }
  }
})();
