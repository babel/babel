var z = {};
var { x: { y } = {} } = z;
expect(y).toBeUndefined();

var { x: { y: y2 } = {} } = { x: { y: 1 } };
expect(y2).toBe(1);

expect(() => {
  var { x: { y: y3 } = {} } = { x: null };
}).toThrow(TypeError);
