
var f1 = i => i;
var f2 = i => { return i; };
var f3 = (i) => { return i; };
assert.equal(1, f1(1));
assert.equal(2, f2(2));
assert.equal(3, f1(3));

var g = ({s}) => s;
assert.equal(4, g({s: 4}));

var h1 = ([p]) => p;
var h2 = ([...p]) => p[0];
assert.equal(5, h1([5]));
assert.equal(6, h2([6]));
