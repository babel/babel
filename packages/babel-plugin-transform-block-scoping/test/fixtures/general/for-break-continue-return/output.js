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
  for (var i in nums) {
    var _ret = _loop(i);
    if (_ret === "continue") continue;
    if (_ret === "break") break;
    if (typeof _ret === "object") return _ret.v;
  }
})();
