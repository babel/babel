var key, x, y, z; // impure

key = 1;

var _$a = {
  1: 1,
  a: 1
},
    _ref = key++,
    {
  [_ref]: y
} = _$a,
    x = babelHelpers.objectWithoutProperties(_$a, [_ref].map(babelHelpers.toPropertyKey));

assert.deepEqual({
  a: 1
}, x);
assert.equal(key, 2);
assert.equal(1, y); // takes care of the order

key = 1;

var _$ = {
  2: 2,
  3: 3
},
    _ref2 = ++key,
    _ref3 = ++key,
    {
  [_ref2]: y,
  [_ref3]: z
} = _$,
    rest = babelHelpers.objectWithoutProperties(_$, [_ref2, _ref3].map(babelHelpers.toPropertyKey));

assert.equal(y, 2);
assert.equal(z, 3); // pure, computed property should remain as-is

key = 2;
var _$z = {
  2: "two",
  z: "zee"
};
({
  [key]: y,
  z
} = _$z);
x = babelHelpers.objectWithoutProperties(_$z, [key, "z"].map(babelHelpers.toPropertyKey));
_$z;
assert.equal(y, "two");
assert.deepEqual(x, {});
assert.equal(z, "zee");
