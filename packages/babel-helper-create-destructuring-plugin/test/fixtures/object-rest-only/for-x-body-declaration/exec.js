// A declaration that is the body of a for-of/in loop, not its head, is lowered
for (const x of [{ a: 1, z: 2 }]) var { a, ...b } = x;
expect([a, b]).toEqual([1, { z: 2 }]);

for (const k in { xy: 0 }) var { ...c } = k;
expect(c).toEqual({ 0: "x", 1: "y" });
