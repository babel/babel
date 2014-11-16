function *gen(condition) {
  yield 0;
  if (condition) {
    yield 1;
    yield* gen(false);
    yield 2;
  }
  yield 3;
}

genHelpers.check(gen(true), [0, 1, 0, 3, 2, 3]);
genHelpers.check(gen(false), [0, 3]);
