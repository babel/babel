// `length` is not mapped: `arguments` doesn't need to be unmapped
function f(a, { ...r }) {
  a = 2;
  return [arguments.length, arguments["length"]];
}

// `callee` throws when `arguments` is unmapped
function g(a, { ...r }) {
  return arguments["callee"];
}

function h(a, { ...r }) {
  a = 2;
  return arguments["0"];
}
