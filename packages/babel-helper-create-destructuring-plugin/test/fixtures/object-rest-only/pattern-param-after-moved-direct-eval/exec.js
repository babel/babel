// A pattern parameter following a moved one stays in the list when it
// contains a direct eval: moved into the body, the eval would see the
// declarations of the body.
var x = "outer";

function f({ ...r }, { a = eval("x") }) {
  var x = "inner";
  return a;
}
expect(f({}, {})).toBe("outer");

function g({ ...r }, [a = () => eval("x")]) {
  var x = "inner";
  return a();
}
expect(g({}, [])).toBe("outer");

function h({ ...r }, { a = eval("x") }) {
  function x() {}
  return a;
}
expect(h({}, {})).toBe("outer");

var k = "k";
function i({ ...r }, { [eval("k")]: a }) {
  var k = "j";
  return a;
}
expect(i({}, { k: 1, j: 2 })).toBe(1);
