let hasW, hasX, hasY, hasZ;
let halfConstructed;

class F {
  m() {
    hasW = #w in this;
    hasX = #x in this;
    hasY = #y in this;
    hasZ = #z in this;
  }
  get #w() {}
  #x = 0;
  #y = (() => {
    halfConstructed = this;
    throw "error";
  })();
  #z() {}
}

try {
  new F();
} catch {}
halfConstructed.m();

expect(hasW).toBe(true);
expect(hasX).toBe(true);
expect(hasY).toBe(false);
expect(hasZ).toBe(true);
