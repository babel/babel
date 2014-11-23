
  function *usingThrow() {
    yield 0;
    try {
      try {
        yield 1;
        throw 2;
        yield 3;
      } catch (x) {
        throw yield x;
      } finally {
        yield 5;
      }
    } catch (thrown) {
      yield thrown;
    }
    yield 6;
  }

  function *usingRaise() {
    yield 0;
    try {
      try {
        yield 1;
        genHelpers.raise(2);
        yield 3;
      } catch (x) {
        throw yield x;
      } finally {
        yield 5;
      }
    } catch (thrown) {
      yield thrown;
    }
    yield 6;
  }

  // should statically catch and then finalize
  genHelpers.check(usingThrow(), [0, 1, 2, 5, 3, 6]);

  // should dynamically catch and then finalize
  genHelpers.check(usingRaise(), [0, 1, 2, 5, 3, 6]);
