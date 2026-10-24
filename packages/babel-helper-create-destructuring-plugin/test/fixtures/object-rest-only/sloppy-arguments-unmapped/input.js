function f({ ...a }, b) {
  b = 2;
  return arguments[1];
}
function g(c, { ...d }) {
  return () => arguments;
}
function h({ ...e }, i) {
  return i;
}
