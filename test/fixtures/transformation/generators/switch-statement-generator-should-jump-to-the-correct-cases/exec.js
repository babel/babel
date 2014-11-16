function *gen(a) {
  switch (yield a) {
  case (yield "x") - a:
    return "first case";
  case (yield "y") - a:
    return "second case";
  }
}

genHelpers.check(gen(1), [1, "x"], "first case");
genHelpers.check(gen(2), [2, "x", "y"], "second case");
