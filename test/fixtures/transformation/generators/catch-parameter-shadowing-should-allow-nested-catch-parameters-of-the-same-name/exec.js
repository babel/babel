function *gen() {
  try {
    genHelpers.raise("e1");
  } catch (e) {
    yield e;
    try {
      genHelpers.raise("e2");
    } catch (e) {
      yield e;
    }
    yield e;
  }
}

genHelpers.check(gen(), ["e1", "e2", "e1"]);
