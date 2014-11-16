function *gen(obj) {
  var count = 0;
  for (var key in (yield "why not", obj)) {
    if (obj.hasOwnProperty(key)) {
      if (key === "skip") {
        break;
      }
      count += 1;
      yield [key, obj[key]];
    }
  }
  return count;
}

genHelpers.check(
  gen({ a: 1, b: 2, skip: 3, c: 4 }),
  ["why not", ["a", 1], ["b", 2]],
  2
);
