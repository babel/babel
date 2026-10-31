function f(a = 1) {
  eval("var a = 2");
  return a;
}
function g(a = 1) {
  eval("function a() {}");
  return typeof a;
}
function h(...[a]) {
  eval("var a = 3");
  return a;
}
function k([a], b = 1) {
  return (() => eval("var a = 4, b = 4"))(), [a, b];
}
function m(a = 1) {
  var a = 0;
  eval("var a = 5");
  return a;
}
