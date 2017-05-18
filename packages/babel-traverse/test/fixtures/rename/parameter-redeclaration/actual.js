function f(a, b) {
  var a = "redeclared";
  return b;
}

function g(a) {
  function a() {
    return "function, redeclared";
  }
  return a();
}
