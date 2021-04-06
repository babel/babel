function* g() {
  const y = yield* function* () {
    let z;
    return yield 1;
  }();
  return y;
}
