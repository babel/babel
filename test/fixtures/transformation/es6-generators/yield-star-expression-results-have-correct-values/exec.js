function* foo() {
  yield 0;
  return yield* bar();
}

function* bar() {
  yield 1;
  return 2;
}

genHelpers.check(foo(), [0, 1], 2);
