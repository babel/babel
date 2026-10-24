// The source has a null prototype, so it has no `__proto__` property and the
// default class is used, named after the binding.
const { __proto__ = class { static value = this.name; } } = { __proto__: null };

expect(typeof __proto__).toBe("function");
expect(__proto__.name).toBe("__proto__");
expect(__proto__.value).toBe("__proto__");
