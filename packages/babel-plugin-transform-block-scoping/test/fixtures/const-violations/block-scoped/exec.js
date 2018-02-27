const bar = 123;
{ const bar = 456; }
assert.equal(bar, 123);
