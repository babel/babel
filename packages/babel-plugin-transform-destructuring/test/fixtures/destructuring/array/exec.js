var [a, [b], [c]] = ["hello", [", ", "junk"], ["world"]];
expect(a + b + c).toBe("hello, world");
a = b = c = undefined;
[a, [b], [c]] = ["hello", [", ", "junk"], ["world"]];
expect(a + b + c).toBe("hello, world");
;
