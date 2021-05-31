var a, b, c, d;
({ a, b } = ({ c, d } = { a: 1, b: 2, c: 3, d: 4}));
expect(a).toBe(1);
expect(b).toBe(2);
expect(c).toBe(3);
expect(d).toBe(4);
