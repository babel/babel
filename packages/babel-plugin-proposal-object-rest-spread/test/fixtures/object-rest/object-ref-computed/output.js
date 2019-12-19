var key, x, y, z; // impure

key = 1;

var _ref = key++,
    {
  [_ref]: {
    y
  }
} = {
  1: {
    a: 1,
    y: 1
  }
},
    x = babelHelpers.objectWithoutProperties({
  1: {
    a: 1,
    y: 1
  }
}[_ref], ["y"]);

expect(x).toEqual({
  a: 1
});
expect(key).toBe(2);
expect(y).toBe(1); // takes care of the order

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
    _ref2 = ++key,
    _ref3 = ++key,
    {
  [_ref3]: {
    y
  },
  [_ref2]: {
    z
  }
} = _$,
    rest_y = babelHelpers.objectWithoutProperties(_$[_ref3], ["y"]),
    rest_z = babelHelpers.objectWithoutProperties(_$[_ref2], ["z"]);

expect(y).toBe(2);
expect(rest_y).toEqual({
  z: 3
});
expect(z).toBe(3);
expect(rest_z).toEqual({
  y: 2
});
expect(key).toBe(3);
