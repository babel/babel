var x = "x value";
var getterCalls = 0;
var sym = Symbol("sym");
var y = {
  __proto__: { inherited: 5 },
  a: 1,
  get b() {
    getterCalls++;
    return 2;
  },
  [sym]: 3,
};
Object.defineProperty(y, "hidden", { value: 4, enumerable: false });
var protoValue = { p: 6 };
Object.defineProperty(y, "__proto__", {
  value: protoValue,
  enumerable: true,
  writable: true,
  configurable: true,
});

var x;
var y;
var z;

z = { x, ...y };

expect(getterCalls).toBe(1);
expect(Object.keys(z)).toEqual(["x", "a", "b", "__proto__"]);
expect(z.x).toBe("x value");
expect(z.a).toBe(1);
expect(Object.getOwnPropertyDescriptor(z, "b")).toEqual({
  value: 2,
  writable: true,
  enumerable: true,
  configurable: true,
});
expect(z[sym]).toBe(3);
expect(Object.getOwnPropertyDescriptor(z, "__proto__").value).toBe(protoValue);
expect(Object.getPrototypeOf(z)).toBe(Object.prototype);
expect("hidden" in z).toBe(false);
expect("inherited" in z).toBe(false);

z = { x, w: { ...y } };

expect(getterCalls).toBe(2);
expect(Object.keys(z)).toEqual(["x", "w"]);
expect(z.x).toBe("x value");
expect(z.w).not.toBe(y);
expect(Object.keys(z.w)).toEqual(["a", "b", "__proto__"]);
expect(z.w.a).toBe(1);
expect(Object.getOwnPropertyDescriptor(z.w, "b").value).toBe(2);
expect(z.w[sym]).toBe(3);
expect(Object.getOwnPropertyDescriptor(z.w, "__proto__").value).toBe(protoValue);
expect(Object.getPrototypeOf(z.w)).toBe(Object.prototype);
expect("hidden" in z.w).toBe(false);
expect("inherited" in z.w).toBe(false);
