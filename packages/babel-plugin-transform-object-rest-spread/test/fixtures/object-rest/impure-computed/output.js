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

expect(x).toEqual({
  a: 1
});
expect(key).toBe(2);
expect(y).toBe(1); // takes care of the order

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

expect(y).toBe(2);
expect(z).toBe(3); // pure, computed property should remain as-is

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
expect(y).toBe("two");
expect(x).toEqual({});
expect(z).toBe("zee");
