var length = function (a, b, ...items) {
  return items.length;
};

assert.equal(length(), 0);
assert.equal(length(1), 0);
assert.equal(length(1, 2), 0);
assert.equal(length(1, 2, 3), 1);
