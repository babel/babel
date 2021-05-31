function f(z, b) {
  var z = "redeclared";
  return b;
}

function g(z) {
  function z() {
    return "function, redeclared";
  }

  return z();
}
