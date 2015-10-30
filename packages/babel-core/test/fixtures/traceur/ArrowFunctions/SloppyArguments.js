
var f1 = implements => implements;
var f2 = implements => { return implements; };
var f3 = (implements) => { return implements; };
assert.equal(1, f1(1));
assert.equal(2, f2(2));
assert.equal(3, f1(3));

var g = ({static}) => static;
assert.equal(4, g({static: 4}));

var h1 = ([protected]) => protected;
var h2 = ([...protected]) => protected[0];
assert.equal(5, h1([5]));
assert.equal(6, h2([6]));
