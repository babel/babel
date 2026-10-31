// The parameters following a lowered one are moved into the body: their
// anonymous default values are still named after them, before the static
// initializers of a class run.
function f({ ...r }, C = class { static saved = this.name }) {
  return C.saved;
}
expect(f({})).toBe("C");

function g({ ...r }, h = function () {}, a = () => {}) {
  return [h.name, a.name];
}
expect(g({})).toEqual(["h", "a"]);
