var _loop = function () {
  var z = 3; // force loop function
  (function () {
    return z;
  });
  switch (true) {
    case true:
      // break loop
      return 1;
  }
};
loop: for (var i = 0; i < 10; i++) {
  if (_loop()) break loop;
}
