// The elements following a lowered one are only bound after its brand check,
// which can throw, and after its default value, which can read them.
class C {
  static #x;
  static assign(value) {
    let x;
    [{ #x: x }, z] = value;
  }
  static assignRest(value) {
    let x;
    [{ #x: x }, ...z] = value;
  }
  static declare() {
    function f() {
      return typeof y;
    }
    var [{ #x: x = f() }, ...y] = [C, 1];
    return x;
  }
}

var z = 0;
expect(() => C.assign([{}, 1])).toThrow(TypeError);
expect(z).toBe(0);
expect(() => C.assignRest([{}, 1])).toThrow(TypeError);
expect(z).toBe(0);

expect(C.declare()).toBe("undefined");
