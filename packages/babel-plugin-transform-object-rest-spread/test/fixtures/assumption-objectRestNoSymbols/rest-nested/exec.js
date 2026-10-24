var inner = {
  __proto__: { inherited: 7 },
  b: 2,
  c: 3,
  x: 4,
  get y() {
    return 5;
  },
};
Object.defineProperty(inner, "hidden", { value: 8, enumerable: false });
var obj = { a: 1, nested: inner, e: 6 };

let { a, nested: { b, c, ...d }, e } = obj;

expect(a).toBe(1);
expect(b).toBe(2);
expect(c).toBe(3);
expect(d).toEqual({ x: 4, y: 5 });
expect(Object.keys(d)).toEqual(["x", "y"]);
expect(Object.getOwnPropertyDescriptor(d, "y").value).toBe(5);
expect(d).not.toBe(inner);
expect("hidden" in d).toBe(false);
expect("inherited" in d).toBe(false);
expect(e).toBe(6);
expect(Object.keys(inner)).toEqual(["b", "c", "x", "y"]);
