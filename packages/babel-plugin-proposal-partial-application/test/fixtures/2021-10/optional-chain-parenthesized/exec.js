const o = { b() { return this; } };
const none = null;

// Parentheses end the optional chain
expect(() => (none?.b~()).c).toThrow(TypeError);
expect((o?.b~()).call).toBe(Function.prototype.call);

// Parentheses keep the receiver
expect((o?.b)~()()).toBe(o);
expect((o?.b)?.~()()).toBe(o);
expect((none?.b)?.~()).toBe(undefined);
