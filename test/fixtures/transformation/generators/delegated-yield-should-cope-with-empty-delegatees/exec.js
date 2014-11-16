function *gen(condition) {
  if (condition) {
    yield 0;
    yield* gen(false);
    yield 1;
  }
}

genHelpers.check(gen(true), [0, 1]);
genHelpers.check(gen(false), []);
