// The arguments object of a function with a rest parameter is unmapped, also
// when the body redeclares it with `var`
function f(...rest) {
  var arguments;
  return arguments;
}
expect(typeof Object.getOwnPropertyDescriptor(f(1), "callee").get).toBe("function");

function g(a = 1) {
  var arguments;
  arguments[0] = 9;
  return a;
}
expect(g(1)).toBe(1);
