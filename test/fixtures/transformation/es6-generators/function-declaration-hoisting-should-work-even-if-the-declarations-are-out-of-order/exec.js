function *gen(n) {
  yield increment(n);

  function increment(x) {
    return x + 1;
  }

  if (n % 2) {
    yield halve(decrement(n));

    function halve(x) {
      return x >> 1;
    }

    function decrement(x) {
      return x - 1;
    }
  }

  yield increment(increment(n));
}

genHelpers.check(gen(3), [4, 1, 5]);
genHelpers.check(gen(4), [5, 6]);
