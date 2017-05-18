function f(z, b) {
  var z = "redeclared";
  return b;
}

function g(a) {
  function z() {
    return "function, redeclared";
  }
  return z();
}