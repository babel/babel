// A function declaration of the body redeclares the rest parameter: in the
// body, the name refers to the function.
function f(...args) {
  function args() {}
  return typeof args;
}
expect(f(1)).toBe("function");

function* g(...args) {
  function args() {}
  yield typeof args;
}
expect([...g(1)]).toEqual(["function"]);
