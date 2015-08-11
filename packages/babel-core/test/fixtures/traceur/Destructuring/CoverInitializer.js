// https://github.com/google/traceur-compiler/issues/1015

var x, y;
({x = 1, y = 2} = {});
assert.equal(x, 1);
assert.equal(y, 2);

({x: {x = 3}} = {x: {}});
assert.equal(x, 3);
