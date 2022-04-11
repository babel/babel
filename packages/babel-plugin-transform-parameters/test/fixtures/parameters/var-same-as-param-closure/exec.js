var x = 1
function foo(x, y = function () { x = 2 }) {
  var x = 3
  y()
  expect(x).toBe(3);
}
foo()
expect(x).toBe(1);
