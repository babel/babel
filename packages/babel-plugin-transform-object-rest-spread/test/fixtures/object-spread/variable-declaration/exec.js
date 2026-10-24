var getterCalls = 0;
var sym = Symbol("sym");
var nested = { n: 1 };
var x = {
  __proto__: { inherited: 4 },
  a: nested,
  get b() {
    getterCalls++;
    return 2;
  },
  [sym]: 3,
};
Object.defineProperty(x, "hidden", { value: 5, enumerable: false });
var protoValue = { p: 6 };
Object.defineProperty(x, "__proto__", {
  value: protoValue,
  enumerable: true,
  writable: true,
  configurable: true,
});

var z = { ...x };

expect(z).not.toBe(x);
expect(getterCalls).toBe(1);
expect(Object.keys(z)).toEqual(["a", "b", "__proto__"]);
expect(z.a).toBe(nested);
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
