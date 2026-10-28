const log = [];
class C {
  get #a() {
    log.push("#a");
    return 1;
  }
  static declaration(z) {
    const [{ #a: a }, { b }, {}] = z;
    return [a, b];
  }
  static assignment(z) {
    let a, b;
    [{ #a: a }, { b }] = z;
    return [a, b];
  }
}
const other = {
  get b() {
    log.push("b");
    return 2;
  },
};

expect(C.declaration([new C(), other, {}])).toEqual([1, 2]);
expect(log).toEqual(["#a", "b"]);

log.length = 0;
expect(C.assignment([new C(), other])).toEqual([1, 2]);
expect(log).toEqual(["#a", "b"]);

// The brand check of the first element throws before the second one is read.
log.length = 0;
expect(() => C.declaration([{}, other, {}])).toThrow(TypeError);
expect(log).toEqual([]);

// An empty object pattern still checks its value, after the previous elements.
log.length = 0;
expect(() => C.declaration([new C(), other, null])).toThrow(TypeError);
expect(log).toEqual(["#a", "b"]);
