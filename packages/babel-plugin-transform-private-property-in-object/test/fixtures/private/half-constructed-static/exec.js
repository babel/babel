let hasW, hasX, hasY, hasZ;
let halfConstructed;

try {
  class F {
    static m() {
      hasW = #w in this;
      hasX = #x in this;
      hasY = #y in this;
      hasZ = #z in this;
    }
    static get #w() {}
    static #x = 0;
    static #y = (() => {
      halfConstructed = this;
      throw "error";
    })();
    static #z() {}
  }
} catch {}

halfConstructed.m();

expect(hasW).toBe(true);
expect(hasX).toBe(true);
expect(hasY).toBe(false);
expect(hasZ).toBe(true);
