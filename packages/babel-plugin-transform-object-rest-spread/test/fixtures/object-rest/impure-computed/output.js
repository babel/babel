var _key, _key2, _key3, _key4;
var key, x, y, z;
// impure
key = 1;
var _$a = {
    1: 1,
    a: 1
  },
  {
    [_key = babelHelpers.toPropertyKey(key++)]: y
  } = _$a,
  x = babelHelpers.objectWithoutProperties(_$a, [_key]);
expect(x).toEqual({
  a: 1
});
expect(key).toBe(2);
expect(y).toBe(1);

// takes care of the order

key = 1;
var _$ = {
    2: 2,
    3: 3
  },
  {
    [_key2 = babelHelpers.toPropertyKey(++key)]: y,
    [_key3 = babelHelpers.toPropertyKey(++key)]: z
  } = _$,
  rest = babelHelpers.objectWithoutProperties(_$, [_key2, _key3]);
expect(y).toBe(2);
expect(z).toBe(3);

// pure, computed property should remain as-is
key = 2;
var _$z = {
  2: "two",
  z: "zee"
};
({
  [_key4 = babelHelpers.toPropertyKey(key)]: y,
  z
} = _$z);
x = babelHelpers.objectWithoutProperties(_$z, [_key4, "z"]);
expect(y).toBe("two");
expect(x).toEqual({});
expect(z).toBe("zee");
