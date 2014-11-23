function *outer(n) {
  yield n;
  yield* middle(n - 1, inner(n + 10));
  yield n + 1;
}

function *middle(n, plusTen) {
  yield n;
  yield* inner(n - 1);
  yield n + 1;
  yield* plusTen;
}

function *inner(n) {
  yield n;
}

genHelpers.check(outer(5), [5, 4, 3, 5, 15, 6]);
