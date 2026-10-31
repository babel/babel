// The array literal is fully evaluated before any nested target runs.
var z = 1;
var obj = { get x() { z = 2; return 0; } };
var [[{ x }], y] = [[obj], z];
expect(y).toBe(1);

z = 1;
var f = () => { z = 2; return 0; };
var [[a = f()], b] = [[undefined], z];
expect(a).toBe(0);
expect(b).toBe(1);

var [[c], d] = [[1], z];
expect([c, d]).toEqual([1, 2]);
