// With parameter expressions, the body has its own `x` binding: closures
// created in the parameters keep seeing the parameter.
function f({ a = () => x, ...rest }, x) {
  var x = 2;
  return [a(), x, rest];
}
expect(f({ b: 1 }, 1)).toEqual([1, 2, { b: 1 }]);

function g(x, { a = () => typeof x, ...rest }) {
  function x() {}
  return [a(), typeof x];
}
expect(g(1, {})).toEqual(["number", "function"]);
