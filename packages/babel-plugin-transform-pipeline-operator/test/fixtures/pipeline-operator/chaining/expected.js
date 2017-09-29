var inc = x => x + 1;

var double = x => x * 2;

assert.equal(double(inc(10)), 22);
