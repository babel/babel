const f0 = (a, b = a, c = b) => [a, b, c];
assert.deepEqual(f0(1), [1, 1, 1]);

const f1 = ({a}, b = a, c = b) => [a, b, c];
assert.deepEqual(f1({a: 1}), [1, 1, 1]);

const f2 = ({a}, b = a, c = a) => [a, b, c];
assert.deepEqual(f2({a: 1}), [1, 1, 1]);
