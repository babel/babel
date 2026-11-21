let inner;
struct Other {
  o = 1;
}
struct P {
  set x(v) {
    inner = new Other();
  }
  get x() {
    return 0;
  }
}
struct S extends P {
  x;
  y = 2;
}
const s = new S();
expect(inner).not.toBe(s);
expect(inner).toBeInstanceOf(Other);
expect(inner.o).toBe(1);
expect(s.y).toBe(2);
