function* gen() {
  try {
    throw {};
  } catch ({ a = yield 1 }) {
    yield a;
  }
}
