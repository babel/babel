var inc = x => x + 1;

var result = inc(4 || 9);
assert.equal(result, 5);

var f = x => x + 10;

var h = x => x + 20;

var result2 = inc((f || h)(10));
assert.equal(result2, 21);
