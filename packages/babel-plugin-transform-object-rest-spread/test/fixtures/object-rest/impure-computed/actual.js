var key, x, y, z;
// impure
key = 1;
var { [key++]: y, ...x } = { 1: 1, a: 1 };
assert.deepEqual({ a: 1 }, x);
assert.equal(key, 2);
assert.equal(1, y);

// takes care of the order

key = 1;
var { [++key]: y, [++key]: z, ...rest} = {2: 2, 3: 3};
assert.equal(y, 2);
assert.equal(z, 3);

// pure, computed property should remain as-is
key = 2;
({ [key]: y, z, ...x } = {2: "two", z: "zee"});
assert.equal(y, "two");
assert.deepEqual(x, {});
assert.equal(z, "zee");
