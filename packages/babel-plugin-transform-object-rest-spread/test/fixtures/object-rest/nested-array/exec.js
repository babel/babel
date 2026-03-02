const [a, {b, ...c}] = [1, { b: 2, other: 3 }];
expect(a).toBe(1);
expect(b).toBe(2);
expect(c).toStrictEqual({ other: 3 });

let [d, {e, ...f}] = [4, { e: 5, other: 6 }];
expect(d).toBe(4);
expect(e).toBe(5);
expect(f).toStrictEqual({ other: 6 });

let g, h, i;

[g, {h, ...i}] = [7, { h: 8, other: 9 }];
expect(g).toBe(7);
expect(h).toBe(8);
expect(i).toStrictEqual({ other: 9 });
