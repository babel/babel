const value = {};
const source = { skip: 0, ["__proto__"]: value };
const { skip, ...rest } = source;
expect(Object.getOwnPropertyDescriptor(rest, "__proto__")).toEqual({
  value,
  enumerable: true,
  configurable: true,
  writable: true,
});
expect(Object.getPrototypeOf(rest)).toBe(Object.prototype);
