function *gen(x) {
  yield x;
}

genHelpers.check(gen("oyez"), ["oyez"]);
genHelpers.check(gen("foo", "bar"), ["foo"]);
