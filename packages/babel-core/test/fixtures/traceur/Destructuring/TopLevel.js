var a, b, c, d;
[a, [b, c], d] = ['hello', [',', 'junk'], ['world']];

// ----------------------------------------------------------------------------

assert.equal('hello', a);
assert.equal(',', b);
assert.equal('junk', c);
assertArrayEquals(['world'], d);
