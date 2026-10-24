var x = "x value";
var nested = { n: 3 };
var y = {
  __proto__: { inherited: 5 },
  a: 1,
  get b() {
    return 2;
  },
  c: nested,
};
Object.defineProperty(y, "hidden", { value: 4, enumerable: false });

var x;
var y;
var z;

z = { x, ...y };

expect(Object.keys(z)).toEqual(["x", "a", "b", "c"]);
expect(z.x).toBe("x value");
expect(z.a).toBe(1);
expect(Object.getOwnPropertyDescriptor(z, "b")).toEqual({
  value: 2,
  writable: true,
  enumerable: true,
  configurable: true,
});
expect(z.c).toBe(nested);
expect("hidden" in z).toBe(false);
expect("inherited" in z).toBe(false);

z = { x, w: { ...y } };

expect(Object.keys(z)).toEqual(["x", "w"]);
expect(z.x).toBe("x value");
expect(z.w).not.toBe(y);
expect(Object.keys(z.w)).toEqual(["a", "b", "c"]);
expect(z.w.a).toBe(1);
expect(Object.getOwnPropertyDescriptor(z.w, "b").value).toBe(2);
expect(z.w.c).toBe(nested);
expect("hidden" in z.w).toBe(false);
expect("inherited" in z.w).toBe(false);
