const bar = { fromBar: 1 };

const a = {};
expect(a.__proto__ ??= bar).toBe(Object.prototype);
expect(Object.getPrototypeOf(a)).toBe(Object.prototype);
expect(a.fromBar).toBeUndefined();

const b = Object.create(null);
b.__proto__ ||= bar;
expect(b.fromBar).toBe(1);

const c = {};
c.__proto__ &&= bar;
expect(c.fromBar).toBe(1);
