var y = "outer";
// The defaults assign the outer `y`, not the function declared in the body.
function f(...{ v = (y = 5), ...h }) {
  return y;
  function y() {}
}
expect(typeof f({})).toBe("function");
expect(y).toBe(5);

var z = "outer";
function g({ v = ([z] = [6]), ...h }) {
  return z;
  function z() {}
}
expect(typeof g({})).toBe("function");
expect(z).toBe(6);
