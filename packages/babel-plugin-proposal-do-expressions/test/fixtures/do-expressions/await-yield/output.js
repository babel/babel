async function* asyncGenerator(x) {
  const y = yield* async function* () {
    let z;
    return yield await x;
  }();
  return y;
}
