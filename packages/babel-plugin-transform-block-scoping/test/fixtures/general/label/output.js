var _loop = function () {
  var z = 3; // force loop function
  (function () {
    return z;
  });
  switch (true) {
    case true:
      return 1; // break loop
  }
};
loop: for (var i = 0; i < 10; i++) {
  if (_loop()) break loop;
}
