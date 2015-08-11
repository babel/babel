// https://github.com/google/traceur-compiler/issues/969

var x;
[x = 1] = [];
assert.equal(x, 1);
