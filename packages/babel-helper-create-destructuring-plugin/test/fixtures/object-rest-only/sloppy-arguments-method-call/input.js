// The elements of `arguments` are called with `arguments` as `this`
function f(fn, b, { ...r }) {
  arguments[0]();
  return b;
}

function g(fn, b, { ...r }) {
  arguments[0]?.();
  return b;
}

function h(fn, b, { ...r }) {
  arguments[0]``;
  return b;
}

// A computed key is only read
function i(a, { ...r }) {
  ({ [arguments[0]]: r } = {});
}
