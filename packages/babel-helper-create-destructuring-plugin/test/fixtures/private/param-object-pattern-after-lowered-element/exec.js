const log = [];
class C {
  get #a() {
    log.push("#a");
    return 1;
  }
  static m([{ #a: a }, { b }], c) {
    return [a, b, c];
  }
}
const other = {
  get b() {
    log.push("b");
    return 2;
  },
};

expect(C.m([new C(), other], 3)).toEqual([1, 2, 3]);
expect(log).toEqual(["#a", "b"]);
expect(C.m.length).toBe(2);

// The brand check of the first element throws before the second one is read.
log.length = 0;
expect(() => C.m([{}, other])).toThrow(TypeError);
expect(log).toEqual([]);

// The second element is checked for null after the first one is read.
log.length = 0;
expect(() => C.m([new C(), null])).toThrow(TypeError);
expect(log).toEqual(["#a"]);
