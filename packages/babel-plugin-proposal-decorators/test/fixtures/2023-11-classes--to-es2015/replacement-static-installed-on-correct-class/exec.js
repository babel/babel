let hasX, hasA, hasM, OriginalFoo;

class Bar {}

function dec(Foo) {
  OriginalFoo = Foo;
  return Bar;
}

@dec
class Foo {
  static #x;
  static accessor #a;
  static #m() {}

  static x;
  static accessor a;
  static m() {}

  static {
    hasX = o => #x in o;
    hasA = o => #a in o;
    hasM = o => #m in o;
  }
}

expect(hasX(Bar)).toBe(true);
expect(hasA(Bar)).toBe(true);
expect(hasM(Bar)).toBe(true);
expect(hasX(OriginalFoo)).toBe(false);
expect(hasA(OriginalFoo)).toBe(false);
expect(hasM(OriginalFoo)).toBe(false);

expect(Bar.hasOwnProperty("x")).toBe(true);
expect(OriginalFoo.hasOwnProperty("x")).toBe(false);

expect(Bar.hasOwnProperty("a")).toBe(false);
expect(OriginalFoo.hasOwnProperty("a")).toBe(true);

expect(Bar.hasOwnProperty("m")).toBe(false);
expect(OriginalFoo.hasOwnProperty("m")).toBe(true);
