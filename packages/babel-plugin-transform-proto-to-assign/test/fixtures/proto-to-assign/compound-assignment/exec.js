const bar = { fromBar: 1 };

const a = {};
a.__proto__ ??= bar;
expect(Object.getPrototypeOf(a)).toBe(Object.prototype);
expect(a.fromBar).toBeUndefined();

const b = Object.create(null);
b.__proto__ ??= bar;
expect(Object.getPrototypeOf(b)).toBe(null);
expect(Object.getOwnPropertyDescriptor(b, "__proto__").value).toBe(bar);

const c = {};
const x = (c.__proto__ ||= bar);
expect(x).toBe(Object.prototype);
expect(Object.getPrototypeOf(c)).toBe(Object.prototype);
expect(c.fromBar).toBeUndefined();

const d = {};
d.__proto__ += "";
expect(Object.getPrototypeOf(d)).toBe(Object.prototype);
expect(Object.hasOwn(d, "__proto__")).toBe(false);
