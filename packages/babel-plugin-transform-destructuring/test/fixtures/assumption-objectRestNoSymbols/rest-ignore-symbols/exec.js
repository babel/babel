let sym = Symbol();

let { a, ...r } = { a: 1, b: 2, [sym]: 3 };

expect(a).toBe(1);
expect(r.b).toBe(2);
expect(sym in r).toBe(false);
