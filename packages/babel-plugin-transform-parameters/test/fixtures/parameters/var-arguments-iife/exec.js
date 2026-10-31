// `var arguments` redeclares the arguments object of the function, also once
// the body is moved into an IIFE
function* f(a = 1) {
  var arguments;
  yield arguments;
}
expect(Array.from(f(2, 3).next().value)).toEqual([2, 3]);

function* g(...[a]) {
  var t = typeof arguments;
  var arguments = 5;
  yield [t, arguments];
}
expect(g(1).next().value).toEqual(["object", 5]);
