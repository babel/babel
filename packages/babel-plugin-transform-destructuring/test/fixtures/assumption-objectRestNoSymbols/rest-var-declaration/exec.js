var obj = { a: 1, b: 2, c: 3, d: 4 };

var { a, b, ...c } = obj;

expect(a).toBe(1);
expect(b).toBe(2);
expect(c).toEqual({ c: 3, d: 4 });
expect(obj).toEqual({ a: 1, b: 2, c: 3, d: 4 });
