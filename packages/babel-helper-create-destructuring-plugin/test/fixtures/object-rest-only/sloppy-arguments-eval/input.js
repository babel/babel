function f({ ...a }, b) {
  return h(eval);
}
function g({ ...a }, b) {
  eval("b = 2");
  return arguments[1];
}
