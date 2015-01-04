var arr = [,1, ,3,];
assert.equal(4, arr.length);

var arr2 = [,1, ,...[3],];
assert.equal(4, arr.length);

var x, y;
[x, , y] = [0, 1, 2];
assert.equal(0, x);
assert.equal(2, y);
