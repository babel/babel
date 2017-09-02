var _loop = function () {
  var z = 3; // force loop function

  (function () {
    return z;
  });

  switch (true) {
    case true:
      return "break|loop";
  }
};

loop: for (var i = 0; i < 10; i++) {
  var _ret = _loop();

  if (_ret === "break|loop") break loop;
}
