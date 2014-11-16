function *usingThrow(x) {
  yield 0;
  try {
    yield 1;
    if (x % 2 === 0)
      throw 2;
    yield x;
  } catch (x) {
    yield x;
  }
  yield 3;
}

function *usingRaise(x) {
  yield 0;
  try {
    yield 1;
    if (x % 2 === 0)
      genHelpers.raise(2);
    yield x;
  } catch (x) {
    yield x;
  }
  yield 3;
}

// should catch static exceptions properly
genHelpers.check(usingThrow(4), [0, 1, 2, 3]);
genHelpers.check(usingThrow(5), [0, 1, 5, 3]);

// should catch dynamic exceptions properly
genHelpers.check(usingRaise(4), [0, 1, 2, 3]);
genHelpers.check(usingRaise(5), [0, 1, 5, 3]);
