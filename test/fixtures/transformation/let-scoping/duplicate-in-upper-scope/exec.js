let x = [0];
for (let x of x) {
  assert.equal(x, 0);
}
assert.deepEqual(x, [0]);
