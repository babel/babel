function* fn(a, [], b = 2) {
  yield a;
  yield arguments;
  yield this;
  return b;
}
