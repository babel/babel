function *outer(n) {
  yield 0;
  assert.ok(regeneratorRuntime.isGeneratorFunction(inner));
  return yield* inner(n);

  // Note that this function declaration comes after everything else
  // in the outer function, but needs to be fully available above.
  function *inner(n) {
    yield n - 1;
    yield n;
    return yield n + 1;
  }
}

genHelpers.check(outer(2), [0, 1, 2, 3], 4);
