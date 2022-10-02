for (var a of [1]) {
  switch (true) {
    case true:
      {
        var _ret = function () {
          var b = 1;
          (function () {
            return b;
          });
          if (true) return "break";
          return "continue";
        }();
        if (_ret === "break") break;
        if (_ret === "continue") continue;
      }
    case false:
      {
        throw new Error("unreachable");
      }
  }
}
