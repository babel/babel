const proto = {};

let a, b;
({ __proto__: a, __proto__: b } = proto);
expect(a).toBe(Object.prototype);
expect(b).toBe(Object.prototype);
