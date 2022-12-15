var _loop = function () {
  switch (true) {
    case true:
      {
        var b = 1;
        (function () {
          return b;
        });
        if (true) break;
        return "continue";
      }
    case false:
      {
        throw new Error("unreachable");
      }
  }
};
for (var a of [1]) {
  var _ret = _loop();
  if (_ret === "continue") continue;
}
