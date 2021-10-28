var _ref, _ref2;

const triple = function (x) {
  return x * 3;
};

const result = (_ref2 = -7, (_ref = Math.abs(_ref2), triple(_ref)));
return expect(result).toBe(21);
