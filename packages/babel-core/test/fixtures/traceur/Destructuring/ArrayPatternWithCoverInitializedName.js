var x, y;
[x, {y = 1}] = [0, {}];

assert.equal(x, 0);
assert.equal(y, 1);
