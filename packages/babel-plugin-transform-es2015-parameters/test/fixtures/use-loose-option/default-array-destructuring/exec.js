function t([,,a] = [1,2,3]) { return a }

assert.equal(t(), 3);
assert.equal(t([4,5,6]), 6);
