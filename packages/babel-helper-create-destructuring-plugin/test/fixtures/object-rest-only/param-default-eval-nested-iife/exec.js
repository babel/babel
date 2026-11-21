// Both plugins wrap the body in an IIFE, and alias `arguments`.
function f(q = eval("1"), [{ ...m } = () => m] = []) {
  return [q, arguments[0], arguments.length];
}
expect(f("s", [])).toEqual(["s", "s", 2]);
expect(f()).toEqual([1, undefined, 0]);

function* g(b = eval("1"), { ...x }) {
  yield arguments.length;
}
expect(g(1, {}).next().value).toBe(2);
