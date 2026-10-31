function f(arguments) {
  var _arguments = babelHelpers.slicedToArray(arguments, 2),
    a = _arguments[0],
    b = _arguments[1];
}
function g() {
  var a = Array.prototype.slice.call(arguments)[0];
  return () => {
    var b = Array.prototype.slice.call(arguments)[0];
  };
}
// Not in a function: `arguments` is a global
var c = babelHelpers.slicedToArray(arguments, 1)[0];
