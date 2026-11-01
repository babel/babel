// The elements of `arguments` are called with `arguments` as `this`, which
// can't change the parameters of an unmapped `arguments` object
function setSecond() {
  this[1] = 2;
}

function f(fn, b, { ...r }) {
  arguments[0]();
  return b;
}
expect(f(setSecond, 1, {})).toBe(1);

function g(fn, b, { ...r }) {
  arguments[0]?.();
  return b;
}
expect(g(setSecond, 1, {})).toBe(1);

function h(fn, b, { ...r }) {
  arguments[0]``;
  return b;
}
expect(h(setSecond, 1, {})).toBe(1);
