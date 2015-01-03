var x = 'y';
var foo = {[x]: 10, z: {[x]: 10}};
assert.equal(foo.y + foo.z.y, 20);
assert.equal({[x]: {[x]: {[x]: 10}}}.y.y.y, 10);
