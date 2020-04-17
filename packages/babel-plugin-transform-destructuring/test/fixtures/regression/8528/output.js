function isBetween(x, a, b) {
  if (a > b) {
    var _ref = [b, a];
    a = _ref[0];
    b = _ref[1];
  }

  return x > a && x < b;
}
