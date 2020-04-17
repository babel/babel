async function* g() {
  yield* [1, 2, 3];
  yield* iterable;
}
