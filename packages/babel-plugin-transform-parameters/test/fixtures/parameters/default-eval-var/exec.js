// A direct eval of the body can declare `var`s named like the parameters
// (in a separate variable environment, as the parameter list is not simple)
function f(a = 1) {
  eval("var a = 2");
  return a;
}
expect(f()).toBe(2);

function g(a = 1) {
  eval("function a() {}");
  return typeof a;
}
expect(g()).toBe("function");

function h(...[a]) {
  eval("var a = 3");
  return a;
}
expect(h()).toBe(3);

// The declarations of an eval in a nested function don't reach the body
function k([a], b = 1) {
  return (() => eval("var a = 4, b = 4"))(), [a, b];
}
expect(k([0])).toEqual([0, 1]);

// The body is moved into an IIFE, which redeclares the parameters it shadows
function m(a = 1) {
  var a = 0;
  eval("var a = 5");
  return a;
}
expect(m()).toBe(5);
