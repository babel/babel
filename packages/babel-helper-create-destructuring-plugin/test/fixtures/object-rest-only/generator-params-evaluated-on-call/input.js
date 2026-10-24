function* g({ a, ...rest }, b) {
  yield [a, rest, b];
}
