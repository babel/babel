// An anonymous function default value of a lowered pattern is not named after
// the temporary that replaces the pattern. The brand checks throw after the
// name is read.
let seen;
class C {
  static #x;
  static param({ name, a = (seen = name), #x: x } = function () {}) {}
  static nestedParam([{ name, a = (seen = name), #x: x } = function () {}]) {}
  static declaration() {
    var [{ name, a = (seen = name), #x: x } = function () {}] = [];
  }
}

expect(() => C.param()).toThrow(TypeError);
expect(seen).toBe("");

seen = undefined;
expect(() => C.nestedParam([])).toThrow(TypeError);
expect(seen).toBe("");

seen = undefined;
expect(() => C.declaration()).toThrow(TypeError);
expect(seen).toBe("");
