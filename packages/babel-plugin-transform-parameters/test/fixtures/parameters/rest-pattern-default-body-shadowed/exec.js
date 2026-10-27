// The default values of a rest parameter pattern can't see the declarations
// of the function body, like those of the other parameters.
var x = "outer";
function f(...[a = () => x]) {
  var x = "inner";
  return a();
}
expect(f()).toBe("outer");

var h = "outer";
function g(...[a = () => h]) {
  function h() {}
  return a();
}
expect(g()).toBe("outer");

function k(...[a = () => x]) {
  let x = "inner";
  return a();
}
expect(k()).toBe("outer");
