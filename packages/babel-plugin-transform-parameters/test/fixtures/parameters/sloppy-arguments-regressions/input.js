function redeclared(a, b = a) {
  function a() {}
  return [b, arguments[0]];
}
function restRedeclared(a, ...r) {
  function a() {}
  return [typeof a, arguments[0], r];
}
function evalVar(a, ...r) {
  eval("var a = 2");
  return [a, arguments[0], r];
}
function evalBlock(a, ...r) {
  eval("");
  {
    function a() {}
  }
  return [typeof a, arguments[0], r];
}
function callee(a = 0) {
  return arguments;
}
function calleeIIFE(a, b = a) {
  function a() {}
  return arguments;
}
function shadowedArguments(arguments, { a }) {
  eval("");
  return arguments;
}
function bodyArguments(a, { b }) {
  function arguments() {}
  return typeof arguments;
}
function lexicalArguments(a, { b }) {
  const arguments = 7;
  eval("");
  return arguments;
}
