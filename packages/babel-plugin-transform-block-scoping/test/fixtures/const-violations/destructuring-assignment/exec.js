expect(function() {
  const [a, b] = [1, 2];
  a = 3;
}).toThrow('"a" is read-only');

expect(function() {
  const a = 1;
  [a] = [2];
}).toThrow('"a" is read-only');

expect(function() {
  const b = 1;
  ({b} = {b: 2});
}).toThrow('"b" is read-only');
