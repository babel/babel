var _sum, _ref, _ref2;

var result = (_sum = (_ref = (_ref2 = [5, 10], _ref2.map(x => x * 2)), _ref.reduce((a, b) => a + b)), _sum + 1);
expect(result).toBe(31);

var inc = x => x + 1;

var double = x => x * 2;

var result2 = [4, 9].map(x => {
  var _ref3, _x;

  return _ref3 = (_x = x, inc(_x)), double(_ref3);
});
expect(result2).toEqual([10, 20]);
