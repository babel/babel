const f = (...args) => args;
expect(f~("[app]", ...)("Hello", "World!")).toEqual(["[app]", "Hello", "World!"]);
expect(f~("[app]", ...).length).toBe(0);

const g = f~(?, 1, ...);
expect(g(0, 2, 3)).toEqual([0, 1, 2, 3]);
expect(g.length).toBe(1);

// The rest placeholder receives the arguments after the highest ordinal
const h = f~(?1, ..., ?0);
expect(h(0, 1, 2, 3)).toEqual([1, 2, 3, 0]);

// Excess arguments are ignored without the rest placeholder
expect(f~(?)(1, 2, 3)).toEqual([1]);
