let a, b;
[a, b] = [1, a = 5];
expect([a, b]).toEqual([1, 5]);

var [c, d] = [1, c = 5];
expect([c, d]).toEqual([1, 5]);

let e, f;
[e, f] = [1, [e] = [5]];
expect(e).toBe(1);
expect(f).toEqual([5]);

let g = 10, h;
[g, h] = [1, g++];
expect([g, h]).toEqual([1, 10]);
