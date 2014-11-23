var error = new Error("thrown");

function *outer(n) {
  try {
    yield 0;
    yield* inner(n);
    yield 1;
  } catch (err) {
    yield err.message;
  }
  yield 4;
}

function *inner(n) {
  while (n --> 0) {
    try {
      if (n === 3) {
        genHelpers.raise(error);
      }
    } finally {
      yield n;
    }
  }
}

genHelpers.check(outer(3), [0, 2, 1, 0, 1, 4]);
genHelpers.check(outer(5), [0, 4, 3, "thrown", 4]);
