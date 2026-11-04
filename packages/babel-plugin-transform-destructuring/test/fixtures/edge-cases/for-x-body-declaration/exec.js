// A declaration that is the body of a for-of/in loop, not its head, is lowered
for (const x of [{ a: 1 }, { a: 2 }]) var { a } = x;
expect(a).toBe(2);

for (const k in { xy: 0 }) var [b] = k;
expect(b).toBe("x");

for (var { c } of [{ c: { d: 3 } }]) var { d } = c;
expect([c, d]).toEqual([{ d: 3 }, 3]);

// ... including when it introduces multiple bindings
for (const x of [{ e: 1, f: 2 }, { e: 3, f: 4 }]) var { e, f } = x;
expect([e, f]).toEqual([3, 4]);

for (const k in { xy: 0 }) var [g, h] = k;
expect([g, h]).toEqual(["x", "y"]);

for (var { i, j } of [{ i: { l: 5, m: 6 }, j: 7 }]) var { l, m } = i;
expect([i, j, l, m]).toEqual([{ l: 5, m: 6 }, 7, 5, 6]);

for (const x of [{ k: "n", n: 8, p: 9 }]) var { [x.k]: n, ...p } = x;
expect(n).toBe(8);
expect(p).toEqual({ k: "n", p: 9 });

// The head's defaults do not see the bindings of a body they are moved into
var r = "outer r", t = "outer t";
for (const { q = r, s = t } of [{}]) {
  let r = 1, u = 2;
  expect([q, s, r, u]).toEqual(["outer r", "outer t", 1, 2]);
}
