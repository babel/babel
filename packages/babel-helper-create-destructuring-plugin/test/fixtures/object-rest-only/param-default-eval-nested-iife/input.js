function f(q = eval("1"), [{ ...m } = () => m] = []) {
  return [q, arguments[0], arguments.length];
}
