
expect(() => {
  [0, ...{}, 1];
}).toThrow(TypeError);

expect(() => {
  [0, ...{0: 1, 1: 2, length: 2}, 3];
}).toThrow(TypeError);

expect(() => {
  [0, ...true, 1];
}).toThrow(TypeError);

expect(() => {
  [0, ...1, 1];
}).toThrow(TypeError);

expect(() => {
  [0, ...function() {}, 1];
}).toThrow(TypeError);

expect(function() {
  [0, ...null, 1];
}).toThrow(TypeError);

expect(function() {
  [0, ...undefined, 1];
}).toThrow(TypeError);

