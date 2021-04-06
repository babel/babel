async function* asyncGenerator(x) {
  const y = yield* await async function* () {
    let z;
    return yield await x;
  }();
  return y;
}
