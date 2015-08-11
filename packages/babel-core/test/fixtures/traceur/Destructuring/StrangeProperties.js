var x, y;

({if: x = 1, else: y} = {else: 2});
assert.equal(x, 1);
assert.equal(y, 2);

({'': x = 3, ' ': y} = {' ': 4});
assert.equal(x, 3);
assert.equal(y, 4);

({true: x = 5, false: y} = {false: 6});
assert.equal(x, 5);
assert.equal(y, 6);

({0: x = 7, 1: y} = {1: 8});
assert.equal(x, 7);
assert.equal(y, 8);
