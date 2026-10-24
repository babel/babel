// The brand check happens before the following parameters are evaluated.
const log = [];
const g = () => log.push("default");
class C {
  static #x = 1;
  static m({ #x: x }, y = g()) {
    return [x, y];
  }
}
expect(() => C.m({})).toThrow(TypeError);
expect(log).toEqual([]);
expect(C.m(C)).toEqual([1, 1]);
