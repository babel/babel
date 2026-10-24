var coords = [1, 2];
var { x, y } = coords,
    foo = "bar";

expect(x).toBeUndefined();
expect(y).toBeUndefined();
expect(foo).toBe("bar");

var { length, 0: first } = coords,
    second = coords[1];
expect([length, first, second]).toEqual([2, 1, 2]);
