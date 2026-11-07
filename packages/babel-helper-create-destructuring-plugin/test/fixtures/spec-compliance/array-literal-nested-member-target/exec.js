let a = {}, c;
const oldA = a;
[a.b = 1, c] = [2, a = {}];
expect(oldA.b).toBeUndefined();
expect(a.b).toBe(2);

let d = {}, f;
const oldD = d;
[[d.e], f] = [[2], d = {}];
expect(oldD.e).toBeUndefined();
expect(d.e).toBe(2);

let g = { h: "old" }, i;
[{ x: g.h }, i] = [{ x: "new" }, g.h];
expect(g.h).toBe("new");
expect(i).toBe("old");
