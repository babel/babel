var nested = { n: 1 };
var x = {
  __proto__: { inherited: 4 },
  a: nested,
  get b() {
    return 2;
  },
};
Object.defineProperty(x, "hidden", { value: 5, enumerable: false });

var z = { ...x };

expect(z).not.toBe(x);
expect(Object.keys(z)).toEqual(["a", "b"]);
expect(z.a).toBe(nested);
expect(Object.getOwnPropertyDescriptor(z, "b")).toEqual({
  value: 2,
  writable: true,
  enumerable: true,
  configurable: true,
});
expect(Object.getPrototypeOf(z)).toBe(Object.prototype);
expect("hidden" in z).toBe(false);
expect("inherited" in z).toBe(false);
