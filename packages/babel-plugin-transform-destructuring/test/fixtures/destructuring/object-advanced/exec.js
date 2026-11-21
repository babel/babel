expect(() => {
  var rect = {};
  var {topLeft: {x: x1, y: y1}, bottomRight: {x: x2, y: y2}} = rect;
}).toThrow(TypeError);

var rect = { topLeft: { x: 1, y: 2 }, bottomRight: { x: 3, y: 4 } };
var {topLeft: {x: x1, y: y1}, bottomRight: {x: x2, y: y2}} = rect;
expect([x1, y1, x2, y2]).toEqual([1, 2, 3, 4]);

var { 3: foo, 5: bar } = [0, 1, 2, 3, 4, 5, 6];
expect(foo).toBe(3);
expect(bar).toBe(5);
