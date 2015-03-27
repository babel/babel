"use strict";

(function () {
  for (var i in nums) {
    var _ret = (function (i) {
      fns.push(function () {
        return i;
      });
      return {
        v: i
      };
    })(i);

    if (typeof _ret === "object") return _ret.v;
  }
})();
