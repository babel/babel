var _loop = function () {
  switch (true) {
    case true:
      {
        var b = 1;
        (function () {
          return b;
        });
        if (true) break;
        // continue
        return 1;
      }
    case false:
      {
        throw new Error("unreachable");
      }
  }
};
for (var a of [1]) {
  if (_loop()) continue;
}
