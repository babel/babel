// The `callee` property of an unmapped arguments object (functions with
// default, rest or destructuring parameters, even in sloppy mode) is an
// accessor throwing a TypeError.
function f(a = 1) {
  return arguments.callee;
}
expect(() => f()).toThrow(TypeError);

function g(...r) {
  return arguments["callee"];
}
expect(() => g()).toThrow(TypeError);

function h([a]) {
  return typeof arguments.callee;
}
expect(() => h([])).toThrow(TypeError);

// Reading the other properties doesn't observe the mapping
function k(a = 1) {
  return [arguments.length, arguments[0]];
}
expect(k(2)).toEqual([1, 2]);
