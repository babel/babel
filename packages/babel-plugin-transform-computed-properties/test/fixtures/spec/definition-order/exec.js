var a = {
  get ["x"]() { return 0; },
  ["y"]: 1,
};
expect(Object.keys(a)).toStrictEqual(["x", "y"]);

var b = {
  get ["x"]() { return 0; },
  ["x"]: 1,
};
expect(b.x).toBe(1);

var x = 1;
var y = { x, get x() { return 0; }, x };
expect(y.x).toBe(1);
y.x = 2;
expect(y.x).toBe(2);
