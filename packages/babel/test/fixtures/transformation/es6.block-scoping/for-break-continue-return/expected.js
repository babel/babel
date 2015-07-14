"use strict";

(function () {
  var _loop = function (i) {
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
  };

  _loop2: for (var i in nums) {
    var _ret = _loop(i);

    switch (_ret) {
      case "continue":
        continue;

      case "break":
        break _loop2;

      default:
        if (typeof _ret === "object") return _ret.v;
    }
  }
})();