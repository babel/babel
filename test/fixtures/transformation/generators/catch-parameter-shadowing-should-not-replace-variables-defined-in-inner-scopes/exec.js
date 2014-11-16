function *gen(x) {
  try {
    throw x;
  } catch (x) {
    yield x;

    yield (function(x) {
      return x += 1;
    }(x + 1));

    yield (function() {
      var x = arguments[0];
      return x * 2;
    }(x + 2));

    yield (function() {
      function notCalled(x) {
        throw x;
      }

      x >>= 1;
      return x;
    }());

    yield x -= 1;
  }

  yield x;
}

genHelpers.check(gen(10), [10, 12, 24, 5, 4, 10]);
genHelpers.check(gen(11), [11, 13, 26, 5, 4, 11]);
