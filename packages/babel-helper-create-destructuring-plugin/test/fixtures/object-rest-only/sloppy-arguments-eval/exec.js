// Only a direct eval can read the arguments object
function f({ ...a }, b) {
  return [typeof eval, b];
}
expect(f({}, 1)).toEqual(["function", 1]);

function g({ ...a }, b) {
  eval("b = 2");
  return arguments[1];
}
expect(g({}, 1)).toBe(1);
