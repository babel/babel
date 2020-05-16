var a, b = true, c;

a ||= () => {};
b &&= () => {};
c ??= () => {};

expect(a.name).toBe("");
expect(b.name).toBe("");
expect(c.name).toBe("");
