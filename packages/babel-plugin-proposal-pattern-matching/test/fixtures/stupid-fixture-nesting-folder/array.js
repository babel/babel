var test = [1,2,3,4];

assert.equal(match(test) {
  []: 1,
  [1, 2]: 2,
  [1, 2, 3, 4]: 3,
  [1, 2, 3, 4, 5]: 4
}, 3);

assert.equal(match(test) {
  []: 1,
  [1, 2, ...]: 2,
  [1, 2, 3, 4]: 3,
  [1, 2, 3, 4, 5]: 4
}, 2);

assert.equal(match(test) {
  []: 1,
  [1, 2, ...rest]: match(rest) {
    [3]: 3,
    [3, 4]: 666,
  },
  [1, 2, 3, 4]: 3,
  [1, 2, 3, 4, 5]: 4
}, 666);
