var f = ({x}) => x;
assert.equal(42, f({x: 42}));

var g = ({x: y, z: [a, b, ...c]}) => [y, a, b, c];
assertArrayEquals([1, 2, 3, [4, 5]], g({x: 1, z: [2, 3, 4, 5]}));

var h = ([a, {b: c, d}]) => [a, c, d];
assertArrayEquals([1, 2, 3], h([1, {b: 2, d: 3}]));

var i = ([, a]) => a;
assert.equal(i([0, 1]), 1);

var j = ([, [, a]]) => a;
assert.equal(j([0, [1, 2]]), 2);

var k = ([a] = new String('b')) => a;
assert.equal(k(), 'b');
