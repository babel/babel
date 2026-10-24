var coords = [1, 2];
var { x, y } = coords;

expect(x).toBeUndefined();
expect(y).toBeUndefined();

var point = { x: 1, y: 2 };
var { x, y } = point;
expect([x, y]).toEqual([1, 2]);
