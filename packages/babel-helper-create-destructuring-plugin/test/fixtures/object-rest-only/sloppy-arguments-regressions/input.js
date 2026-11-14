function redeclared(a, { ...r }, b = a) {
  function a() {}
  return [b, arguments[0]];
}
function bodyFunction(a, { ...r }) {
  function a() {}
  return [typeof a, arguments[0], r];
}
function evalVar(a, { ...r }) {
  eval("var a = 2");
  return [a, arguments[0], r];
}
function evalBlock(a, { ...r }) {
  eval("");
  {
    function a() {}
  }
  return [typeof a, arguments[0], r];
}
function callee({ ...r }) {
  return arguments;
}
function calleeIIFE(a, { ...r }) {
  function a() {}
  return arguments;
}
function shadowedArguments(arguments, { ...r }) {
  eval("");
  return arguments;
}
function bodyArguments(a, { ...r }) {
  function arguments() {}
  return typeof arguments;
}
function lexicalArguments(a, { ...r }) {
  const arguments = 7;
  eval("");
  return arguments;
}
