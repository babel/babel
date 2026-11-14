// https://github.com/babel/babel/issues/18348
const log = [];
const obj = { get x() { log.push("get"); } };
const [{ x }, tail] = [obj, (log.push("rhs"), 0)];
expect(log).toEqual(["rhs", "get"]);

let later = { x: 2 };
const first = { get x() { later = { x: 3 }; return 1; } };
const [{ x: a }, { x: b }] = [first, later];
expect(a).toBe(1);
expect(b).toBe(2);

// still unpacked when the later elements cannot be affected
const [[c], d = 2, { e }] = [[1], undefined, { e: 3 }];
expect([c, d, e]).toEqual([1, 2, 3]);
