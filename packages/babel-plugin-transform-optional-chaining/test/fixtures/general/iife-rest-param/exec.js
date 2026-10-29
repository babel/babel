// The temporary is declared in the body: it can't follow a rest parameter
var a = { b: { c: 1 } };
expect(
  (function (...rest) {
    return [a?.b.c, rest];
  })(),
).toEqual([1, []]);
expect(
  (function (x, ...rest) {
    return [a?.b.c, x, rest];
  })(1),
).toEqual([1, 1, []]);
