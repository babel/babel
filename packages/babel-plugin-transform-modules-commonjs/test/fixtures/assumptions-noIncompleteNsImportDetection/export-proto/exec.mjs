const a = 1;
export { a as __proto__ };

expect(Object.getOwnPropertyDescriptor(exports, "__proto__").value).toBe(1);
