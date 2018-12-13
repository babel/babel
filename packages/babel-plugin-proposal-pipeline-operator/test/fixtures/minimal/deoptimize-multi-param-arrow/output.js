var _a, _ref;

var a = 1,
    b = 2,
    c = 3;
var result = (_ref = (_a = a, ((a, b) => b)(_a)), ((a, b) => c)(_ref));
expect(result).toBe(c);
