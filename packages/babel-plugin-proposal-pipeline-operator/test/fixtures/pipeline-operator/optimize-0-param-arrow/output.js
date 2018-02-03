var a = 1,
    b = 2,
    c = 3;
var result = (a, (b, c));
assert.equal(result, c);
