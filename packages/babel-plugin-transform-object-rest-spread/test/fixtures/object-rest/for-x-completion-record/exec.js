var a, b;

for ({a, ...b} of []) {}

expect(a).toBeUndefined();
expect(b).toBeUndefined();

// The same loop over a non-empty iterable.
for ({a, ...b} of [{ a: 1, x: 2 }, { a: 3, y: 4 }]) {}

expect(a).toBe(3);
expect(b).toEqual({ y: 4 });
