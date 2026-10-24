let x = 0, a, b, r;
r = [a, b] = [x++, 2];
expect(x).toBe(1);
expect(a).toBe(0);
expect(r).toEqual([0, 2]);

class Foo {}
let c, d;
const s = ([c, d] = [new Foo(), 2]);
expect(s[0]).toBe(c);
