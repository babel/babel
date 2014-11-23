function *gen(n) {
  return yield yield yield yield n;
}

genHelpers.check(gen(5), [5, 1, 2, 3], 4);
genHelpers.check(gen("asdf"), ["asdf", 1, 2, 3], 4);
