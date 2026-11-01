// An anonymous function default value of a lowered pattern is not named after
// the temporary that replaces the pattern.
var [{ name: a, ...r } = function () {}] = [];
expect(a).toBe("");

function f({ name, ...r } = function () {}) {
  return name;
}
expect(f()).toBe("");

function g(x, [{ name, ...r } = () => {}]) {
  return name;
}
expect(g(1, [])).toBe("");
