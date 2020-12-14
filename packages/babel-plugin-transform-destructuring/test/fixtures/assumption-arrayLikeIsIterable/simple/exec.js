var o = { 0: "a", 1: "b", 2: "c", length: 3 };

var [first, ...rest] = o;

expect(first).toBe("a");
expect(rest).toEqual(["b", "c"]);
