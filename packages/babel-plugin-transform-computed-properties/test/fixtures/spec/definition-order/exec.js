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

var x = { x, get x() { return 0; }, x };
expect(x.x).toBe(undefined);
x.x = 1;
expect(x.x).toBe(1);
