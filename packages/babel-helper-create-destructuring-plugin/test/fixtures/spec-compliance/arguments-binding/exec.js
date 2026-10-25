// A binding named `arguments` is destructured with the iterator protocol
function f(arguments) {
  var [a, b] = arguments;
  return [a, b];
}
expect(f(new Set([1, 2]))).toEqual([1, 2]);

// Arrow functions use the arguments object of the enclosing function
function g() {
  var [a] = arguments;
  return () => {
    var [b] = arguments;
    return [a, b];
  };
}
expect(g(3)(4)).toEqual([3, 3]);
