var _ref, _, _ref2;

var inc = x => x + 1;

var result = (_ref = 4 || 9, inc(_ref));
expect(result).toBe(5);

var f = x => x + 10;

var h = x => x + 20;

var result2 = (_ref2 = (_ = 10, (f || h)(_)), inc(_ref2));
expect(result2).toBe(21);
