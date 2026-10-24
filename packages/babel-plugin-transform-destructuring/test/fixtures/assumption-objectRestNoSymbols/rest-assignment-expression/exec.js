var a, b, c;
var obj = { a: 1, b: 2, x: 3, y: 4 };
Object.defineProperty(obj, "hidden", { value: 5, enumerable: false });

({ a, b, ...c } = obj);

expect(a).toBe(1);
expect(b).toBe(2);
expect(c).toEqual({ x: 3, y: 4 });
expect(Object.keys(c)).toEqual(["x", "y"]);
