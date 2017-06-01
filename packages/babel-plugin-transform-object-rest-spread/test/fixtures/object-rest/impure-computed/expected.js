// impure
var key = 1;
var _$a = { "1": 1, a: 1 },
    _ref = key++,
    { [_ref]: y } = _$a,
    x = babelHelpers.objectWithoutProperties(_$a, [_ref].map(babelHelpers.toPropertyKey));
assert.deepEqual({ a: 1 }, x);
assert.equal(key, 2);
assert.equal(1, y);

// pure, computed property should remain as-is
var z;
var _$z = { "2": "two", z: "zee" };
({ [key]: y, z } = _$z);
x = babelHelpers.objectWithoutProperties(_$z, [key, "z"].map(babelHelpers.toPropertyKey));

assert.equal(y, "two");
assert.deepEqual(x, {});
assert.equal(z, "zee");