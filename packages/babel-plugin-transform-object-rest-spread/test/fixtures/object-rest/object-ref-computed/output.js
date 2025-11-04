var _key, _key2, _key3;
var key, x, y, z;
// impure
key = 1;
var _ = {
    1: {
      a: 1,
      y: 1
    }
  },
  {
    [_key = key++]: {
      y
    }
  } = _,
  x = babelHelpers.objectWithoutProperties(_[_key], ["y"]);
expect(x).toEqual({
  a: 1
});
expect(key).toBe(2);
expect(y).toBe(1);

// takes care of the order

key = 1;
var _$ = {
    2: {
      y: 2,
      z: 3
    },
    3: {
      y: 2,
      z: 3
    }
  },
  {
    [_key2 = ++key]: {
      y
    },
    [_key3 = ++key]: {
      z
    }
  } = _$,
  rest_y = babelHelpers.objectWithoutProperties(_$[_key2], ["y"]),
  rest_z = babelHelpers.objectWithoutProperties(_$[_key3], ["z"]);
expect(y).toBe(2);
expect(rest_y).toEqual({
  z: 3
});
expect(z).toBe(3);
expect(rest_z).toEqual({
  y: 2
});
expect(key).toBe(3);
