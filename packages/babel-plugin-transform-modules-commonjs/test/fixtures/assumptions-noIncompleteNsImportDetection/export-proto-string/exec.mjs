const a = {};
export { a as "__proto__" };

expect(Object.getOwnPropertyDescriptor(exports, "__proto__").value).toBe(a);
expect(Object.getPrototypeOf(exports)).not.toBe(a);
