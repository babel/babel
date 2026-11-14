function isBetween(x, a, b) {
  var _ref;
  if (a > b) a = (_ref = [b, a])[0], b = _ref[1];
  return x > a && x < b;
}
