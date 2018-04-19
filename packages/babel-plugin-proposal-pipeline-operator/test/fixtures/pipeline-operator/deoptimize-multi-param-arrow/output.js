var _a;

var a = 1,
    b = 2,
    c = 3;
var result = (_a = a, ((a, b) => {
  var _b;

  return _b = b, ((a, b) => c)(_b);
})(_a));
expect(result).toBe(c);
