expect(() => {
  var rect = {};
  var {topLeft: [x1, y1], bottomRight: [x2, y2] } = rect;
}).toThrow(TypeError);

var rect = { topLeft: [1, 2], bottomRight: [3, 4] };
var {topLeft: [x1, y1], bottomRight: [x2, y2] } = rect;
expect([x1, y1, x2, y2]).toEqual([1, 2, 3, 4]);
