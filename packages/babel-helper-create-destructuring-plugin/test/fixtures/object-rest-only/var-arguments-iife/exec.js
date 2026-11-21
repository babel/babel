// The body is moved into an IIFE: the block function named like the moved
// pattern binding isn't hoisted (Annex B). `var arguments` still redeclares
// the arguments object of the function.
function f({ ...r }) {
  if (true) function r() {}
  var arguments;
  return arguments;
}
const args = f({}, 2);
expect(args.length).toBe(2);
expect(args[1]).toBe(2);

function* g({ ...r }) {
  var arguments;
  yield arguments.length;
}
expect(g({}, 2, 3).next().value).toBe(3);
