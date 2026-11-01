function f(a, { ...r }) {
  a = 2;
  return { [arguments[0]]() {} };
}

function g(a, { ...r }) {
  a = 2;
  return class { static [arguments[0]]() {} };
}
