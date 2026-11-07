var key, x, y, z;
// impure
key = 1;
var _$key = {
    1: {
      a: 1,
      y: 1
    }
  }[key++],
  {
    y
  } = _$key,
  x = babelHelpers.objectWithoutProperties(_$key, ["y"]);
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
      y: 4,
      z: 6
    }
  },
  _$$key = _$[++key],
  {
    y
  } = _$$key,
  rest_y = babelHelpers.objectWithoutProperties(_$$key, ["y"]),
  _$$key2 = _$[++key],
  {
    z
  } = _$$key2,
  rest_z = babelHelpers.objectWithoutProperties(_$$key2, ["z"]);
expect(y).toBe(2);
expect(rest_y).toEqual({
  z: 3
});
expect(z).toBe(6);
expect(rest_z).toEqual({
  y: 4
});
expect(key).toBe(3);
