function *gen() {
  yield 0;
  yield* [
    yield "one",
    yield "two",
    yield "three"
  ];
  yield 5;
}

genHelpers.check(gen(), [0, "one", "two", "three", 2, 3, 4, 5]);
