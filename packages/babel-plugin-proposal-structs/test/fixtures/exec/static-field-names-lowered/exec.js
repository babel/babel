const k = "computed";
struct N {
  static f = () => {};
  static c = class {};
  static #p = class {};
  static [k] = function () {};
  static g = function named() {};
  static getP() {
    return N.#p;
  }
}
expect(N.f.name).toBe("f");
expect(N.c.name).toBe("c");
expect(N.getP().name).toBe("#p");
expect(N.computed.name).toBe("computed");
expect(N.g.name).toBe("named");
