genHelpers.check(function *(x, y) {
  yield x;
  yield y;
  yield x + y;
  return x * y;
}(3, 7), [3, 7, 10], 21);
