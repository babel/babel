const k = "x";
const obj = { "1x": 1, y: 2 };
const { [1 + k]: v, ...r } = obj;
expect(v).toBe(1);
expect(r).toEqual({ y: 2 });

// `1 + c` may call `c.valueOf`, before any target is assigned
const log = [];
let a = "a0", b = "b0";
const c = { valueOf() { log.push([a, b]); return 2; } };
[a, b] = [1 + c, 1 === c];
expect([a, b]).toEqual([3, false]);
expect(log).toEqual([["a0", "b0"]]);
