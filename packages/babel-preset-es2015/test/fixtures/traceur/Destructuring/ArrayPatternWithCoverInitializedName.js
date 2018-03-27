var x, y;
[x, {y = 1}] = [0, {}];

expect(x).toBe(0);
expect(y).toBe(1);
