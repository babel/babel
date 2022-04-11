const y = 2;

const f = x => {
  var _ref, _x;

  return _ref = (_x = x, _x + 1), _ref * y;
};

const g = x => {
  var _x2, _ref2;

  return _x2 = x, (_ref2 = _x2 + 1, _ref2 * _x2);
};

const h = x => {
  var _x3, _ref3;

  return _x3 = x, (_ref3 = _x3 + 1, _ref3 * _x3);
};

expect(f(1)).toBe(4);
expect(g(1)).toBe(2);
expect(h(1)).toBe(2);
