var sum = 0;
for (var x of [1, 2].concat(3)) {
  sum += x;
}
assert.strictEqual(sum, 6);
