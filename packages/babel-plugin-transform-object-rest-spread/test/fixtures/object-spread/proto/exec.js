var spread = { s: 1 };
var proto = { inherited: true };

var obj = {
  ...spread,
  __proto__: proto,
};
expect(Object.getPrototypeOf(obj)).toBe(proto);
expect(Object.hasOwn(obj, "__proto__")).toBe(false);
expect(obj.s).toBe(1);

var mixed = {
  ...spread,
  a: 1,
  __proto__: proto,
  b: 2,
};
expect(Object.getPrototypeOf(mixed)).toBe(proto);
expect(mixed).toMatchObject({ s: 1, a: 1, b: 2 });

var nullProto = {
  ...spread,
  __proto__: null,
};
expect(Object.getPrototypeOf(nullProto)).toBe(null);
expect(nullProto.s).toBe(1);

var protoFirst = {
  __proto__: proto,
  ...spread,
};
expect(Object.getPrototypeOf(protoFirst)).toBe(proto);

// A computed key never updates the prototype.
var computed = {
  ...spread,
  ["__proto__"]: proto,
};
expect(Object.getPrototypeOf(computed)).toBe(Object.prototype);
expect(Object.hasOwn(computed, "__proto__")).toBe(true);
