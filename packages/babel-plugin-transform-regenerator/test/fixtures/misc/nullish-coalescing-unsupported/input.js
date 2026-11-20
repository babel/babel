function* f(a) {
  return a ?? (yield);
}
