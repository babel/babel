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
  } else {
    // The behavior of function declarations nested inside conditional
    // blocks is notoriously underspecified, and in V8 it appears the
    // halve function is still defined when we take this branch, so
    // "undefine" it for consistency with regenerator semantics.
    halve = void 0;
  }

  yield typeof halve;

  yield increment(increment(n));
}

genHelpers.check(gen(3), [4, 1, "function", 5]);
genHelpers.check(gen(4), [5, "undefined", 6]);
