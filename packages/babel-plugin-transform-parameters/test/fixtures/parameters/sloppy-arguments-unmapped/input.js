function f(b, { a }) {
  b = 9;
  return arguments[0];
}
function g(b, c = 1) {
  arguments[0] = 9;
  return b;
}
function h(b, ...r) {
  b = 9;
  return [arguments[0], r];
}
function k(b, c = (arguments[0] = 9)) {
  return b;
}
function m(b, ...arguments) {
  return b;
}
function n(b, c = 1) {
  return b;
}
function p(b, { a }) {
  arguments;
  {
    function b() {}
  }
  return typeof b;
}
function q(a, b = 1) {
  return [arguments.length, arguments[0]];
}
