var x = { x, get x() { return 0; }, x };
x.x = 1;
expect(x.x).toBe(1);
