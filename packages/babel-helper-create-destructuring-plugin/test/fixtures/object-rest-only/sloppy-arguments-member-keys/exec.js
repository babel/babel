function f(a, { ...r }) {
  a = 2;
  return [arguments.length, arguments["length"]];
}
expect(f(1, {})).toEqual([2, 2]);

function g(a, { ...r }) {
  return arguments["callee"];
}
expect(() => g(1, {})).toThrow(TypeError);

function h(a, { ...r }) {
  a = 2;
  return arguments["0"];
}
expect(h(1, {})).toBe(1);
