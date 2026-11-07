var [, a, [b], [c], d] = ["foo", "hello", [", ", "junk"], ["world"]];

expect(a + b + c).toBe("hello, world");
expect(d).toBeUndefined();
