function *gen(x) {
  var y = x + 1;
  try {
    throw x + 2;
  } catch (x) {
    yield x;
    x += 1;
    yield x;
  }
  yield x;
  try {
    throw x + 3;
  } catch (y) {
    yield y;
    y *= 2;
    yield y;
  }
  yield y;
}

genHelpers.check(gen(1), [3, 4, 1, 4, 8, 2]);
genHelpers.check(gen(2), [4, 5, 2, 5, 10, 3]);
