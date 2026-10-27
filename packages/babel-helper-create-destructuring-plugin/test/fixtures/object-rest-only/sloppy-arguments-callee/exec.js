// The `callee` property of an unmapped arguments object (functions with
// destructuring parameters, even in sloppy mode) is an accessor throwing a
// TypeError.
function f({ ...r }) {
  return arguments.callee;
}
expect(() => f({})).toThrow(TypeError);
