// An array pattern following a lowered element is still iterated before the
// outer iterator is closed, but its targets are only bound after the brand
// check of the lowered element.
var log = [];
function* outer(value) {
  try {
    yield value;
    yield (function* () {
      log.push("inner");
      yield 1;
    })();
  } finally {
    log.push("cleanup");
  }
}

class C {
  static #x = 0;
  static assign(value) {
    let x;
    [{ #x: x }, [z, ...w]] = outer(value);
    return x;
  }
}

var z = 0;
var w = 0;
expect(C.assign(C)).toBe(0);
expect(z).toBe(1);
expect(w).toEqual([]);
expect(log).toEqual(["inner", "cleanup"]);

log = [];
z = 0;
w = 0;
expect(() => C.assign({})).toThrow(TypeError);
expect(z).toBe(0);
expect(w).toBe(0);
expect(log).toEqual(["inner", "cleanup"]);
