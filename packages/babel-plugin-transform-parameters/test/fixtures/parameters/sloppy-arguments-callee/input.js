function f(a = 1) {
  return arguments.callee;
}
function g(...r) {
  return arguments["callee"];
}
function h([a]) {
  return typeof arguments.callee;
}
function k(a = 1) {
  return [arguments.length, arguments[0]];
}
