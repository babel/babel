var key = "a";
var proto = { inherited: true };

var obj = {
  [key]: 1,
  __proto__: proto,
};
expect(Object.getPrototypeOf(obj)).toBe(proto);
expect(Object.hasOwn(obj, "__proto__")).toBe(false);
expect(obj.inherited).toBe(true);

var stringKey = {
  [key]: 1,
  "__proto__": proto,
};
expect(Object.getPrototypeOf(stringKey)).toBe(proto);

var nullProto = {
  [key]: 1,
  __proto__: null,
  other: 2,
};
expect(Object.getPrototypeOf(nullProto)).toBe(null);
expect(nullProto.other).toBe(2);

// Only an object or null updates the prototype.
var primitiveProto = {
  [key]: 1,
  __proto__: 5,
};
expect(Object.getPrototypeOf(primitiveProto)).toBe(Object.prototype);
expect(Object.hasOwn(primitiveProto, "__proto__")).toBe(false);
