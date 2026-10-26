// A declaration that is the body of a for-of/in loop, not its head, is lowered
for (const x of [{ a: 1 }, { a: 2 }]) var { a } = x;
expect(a).toBe(2);

for (const k in { xy: 0 }) var [b] = k;
expect(b).toBe("x");

for (var { c } of [{ c: { d: 3 } }]) var { d } = c;
expect([c, d]).toEqual([{ d: 3 }, 3]);
