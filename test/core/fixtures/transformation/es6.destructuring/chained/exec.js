var a, b, c, d;
({ a, b } = { c, d } = { a: 1, b: 2, c: 3, d: 4});
assert.equal(a, 1);
assert.equal(b, 2);
assert.equal(c, 3);
assert.equal(d, 4);
