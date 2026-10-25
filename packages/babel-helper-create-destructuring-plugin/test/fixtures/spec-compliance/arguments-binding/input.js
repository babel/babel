function f(arguments) {
  var [a, b] = arguments;
}
function g() {
  var [a] = arguments;
  return () => {
    var [b] = arguments;
  };
}
// Not in a function: `arguments` is a global
var [c] = arguments;
