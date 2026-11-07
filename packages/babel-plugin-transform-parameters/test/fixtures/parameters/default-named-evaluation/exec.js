// Anonymous default values are named after their parameter, before the
// static initializers of a class run.
function f(
  C = class { static saved = this.name },
  h = function () {},
  a = () => {},
  __proto__ = class {},
) {
  return [C.saved, h.name, a.name, __proto__.name];
}
expect(f()).toEqual(["C", "h", "a", "__proto__"]);

function g(C = class {}) {
  return C.name;
}
expect(g(class X {})).toBe("X");
