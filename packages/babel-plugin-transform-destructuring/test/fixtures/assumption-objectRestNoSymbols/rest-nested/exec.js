var obj = { a: 1, nested: { b: 2, c: 3, x: 4, y: 5 }, e: 6 };

let { a, nested: { b, c, ...d }, e } = obj;

expect(a).toBe(1);
expect(b).toBe(2);
expect(c).toBe(3);
expect(d).toEqual({ x: 4, y: 5 });
expect(e).toBe(6);
expect(obj.nested).toEqual({ b: 2, c: 3, x: 4, y: 5 });
