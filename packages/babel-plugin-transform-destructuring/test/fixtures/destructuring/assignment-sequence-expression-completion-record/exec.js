var x, y;
([x, y] = [1, 2], y);

expect(x).toBe(1);
expect(y).toBe(2);

var result = ([x, y] = [3, 4], y);
expect(result).toBe(4);
expect(x).toBe(3);
