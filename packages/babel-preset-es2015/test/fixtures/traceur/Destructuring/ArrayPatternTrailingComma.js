var [a, b, , ] = [0, 1, , ];
expect(a).toBe(0);
expect(b).toBe(1);

var c, d;
[c, d, , ] = [0, 1, , ];
expect(c).toBe(0);
expect(d).toBe(1);
