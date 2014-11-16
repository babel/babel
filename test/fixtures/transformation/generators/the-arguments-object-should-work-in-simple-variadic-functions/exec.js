function *sum() {
  var result = 0;

  for (var i = 0; i < arguments.length; ++i) {
    yield result += arguments[i];
  }

  return result;
}

genHelpers.check(sum(1, 2, 3), [1, 3, 6], 6);
genHelpers.check(sum(9, -5, 3, 0, 2), [9, 4, 7, 7, 9], 9);
