var a = 1, b = 2;

if (true) [a, b] = [b, a];

expect(a).toBe(2);
expect(b).toBe(1);
