// Options: --symbols=false

var s = Symbol();
var s2 = Symbol();
var object = {};
object[s] = 1;
object[s2] = 2;

assert.equal(object[s], 1);
assert.equal(object[s2], 2);
