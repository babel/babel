function makeMultiplier(x=1) {
  return (y=1) => x * y;
}

assert.equal(makeMultiplier()(), 1);
assert.equal(makeMultiplier(2)(3), 6);
assert.deepEqual([1, 2, 3].map(makeMultiplier(2)), [2, 4, 6]);
assert.deepEqual([undefined, null, 0].map(makeMultiplier(2)), [2, 0, 0]);
