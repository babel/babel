var arr = [,1, ,3,];
expect(arr).toHaveLength(4);

var arr2 = [,1, ,...[3],];
expect(arr).toHaveLength(4);

var x, y;
[x, , y] = [0, 1, 2];
expect(x).toBe(0);
expect(y).toBe(2);
