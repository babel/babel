var z = [];
var [x, ...y] = z;

expect(x).toBeUndefined();
expect(y).toEqual([]);
expect(y).not.toBe(z);
