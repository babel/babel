var a, b, c;
var obj = {
  __proto__: { inherited: 5 },
  a: 1,
  b: 2,
  x: 3,
  get y() {
    return 4;
  },
};
Object.defineProperty(obj, "hidden", { value: 6, enumerable: false });

({ a, b, ...c } = obj);

expect(a).toBe(1);
expect(b).toBe(2);
expect(c).toEqual({ x: 3, y: 4 });
expect(Object.keys(c)).toEqual(["x", "y"]);
expect(Object.getOwnPropertyDescriptor(c, "y").value).toBe(4);
expect(c).not.toBe(obj);
expect("hidden" in c).toBe(false);
expect("inherited" in c).toBe(false);

expect(() => ({ a, b, ...c } = null)).toThrow(TypeError);
