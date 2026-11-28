struct Other {
  o = 1;
}
let n = 0;
let inner;
struct S {
  s = 1;
  static [Symbol.hasInstance](v) {
    if (++n === 3) inner = new Other();
    return Function.prototype[Symbol.hasInstance].call(this, v);
  }
}
const s = new S();
expect(s.s).toBe(1);
expect(Object.keys(s)).toEqual(["s"]);
if (inner) expect(inner.o).toBe(1);
