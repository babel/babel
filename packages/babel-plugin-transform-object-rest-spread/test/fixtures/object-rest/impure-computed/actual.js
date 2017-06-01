// impure
var key = 1;
var { [key++]: y, ...x } = { "1": 1, a: 1 };
assert.deepEqual({ a: 1 }, x);
assert.equal(key, 2);
assert.equal(1, y);

// pure, computed property should remain as-is
var z;
({ [key]: y, z, ...x } = {"2": "two", z: "zee"});
assert.equal(y, "two");
assert.deepEqual(x, {});
assert.equal(z, "zee");
