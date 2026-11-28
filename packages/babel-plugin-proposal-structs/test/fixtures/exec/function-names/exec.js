const sym = Symbol("desc");
const emptySym = Symbol("");
struct S {
  [emptySym] = () => {};
  a = () => {};
  b = function () {};
  c = class {};
  d = function named() {};
  #e = () => {};
  [sym] = () => {};
  1 = () => {};
  "str" = () => {};
  getE() {
    return this.#e;
  }
}
const s = new S();
expect(s.a.name).toBe("a");
expect(s.b.name).toBe("b");
expect(s.c.name).toBe("c");
expect(s.d.name).toBe("named");
expect(s.getE().name).toBe("#e");
expect(s[sym].name).toBe("[desc]");
expect(s[emptySym].name).toBe("[]");
expect(s[1].name).toBe("1");
expect(s.str.name).toBe("str");

struct T {
  [1] = () => {};
  [null] = function () {};
  [1n] = () => {};
  c = class {
    static name() {
      return "static";
    }
  };
  d = class {
    static {
      this.seen = this.name;
    }
  };
}
const t = new T();
expect(t[1].name).toBe("1");
expect(t.null.name).toBe("null");
expect(t[1].name).toBe("1");
expect(t.c.name()).toBe("static");
expect(t.d.seen).toBe("d");
expect(t.d.name).toBe("d");
