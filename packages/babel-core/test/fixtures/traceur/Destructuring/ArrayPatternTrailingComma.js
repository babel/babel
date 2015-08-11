var [a, b, , ] = [0, 1, , ];
assert.equal(a, 0);
assert.equal(b, 1);

var c, d;
[c, d, , ] = [0, 1, , ];
assert.equal(c, 0);
assert.equal(d, 1);
