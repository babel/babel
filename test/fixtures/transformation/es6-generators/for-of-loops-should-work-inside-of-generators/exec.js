function *yieldPermutations(list) {
  if (list.length < 2) {
    yield list;
    return 1;
  }

  var count = 0;
  var first = list.slice(0, 1);
  var genRest = yieldPermutations(list.slice(1));

  for (var perm of genRest) {
    for (var i = 0; i < list.length; ++i) {
      var prefix = perm.slice(0, i);
      var suffix = perm.slice(i);
      yield prefix.concat(first, suffix);
    }

    count += i;
  }

  return count;
}

var count = 0;
for (var perm of yieldPermutations([])) {
  assert.deepEqual(perm, []);
  ++count;
}
assert.strictEqual(count, 1);

genHelpers.check(yieldPermutations([1]), [[1]], 1);

genHelpers.check(yieldPermutations([2, 1]), [
  [2, 1],
  [1, 2]
], 2);

genHelpers.check(yieldPermutations([1,3,2]), [
  [1, 3, 2],
  [3, 1, 2],
  [3, 2, 1],
  [1, 2, 3],
  [2, 1, 3],
  [2, 3, 1]
], 6);
