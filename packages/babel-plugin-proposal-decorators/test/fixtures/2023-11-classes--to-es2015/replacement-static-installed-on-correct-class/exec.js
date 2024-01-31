let hasX, hasM, OriginalFoo;

class Bar {}

function dec(Foo) {
  OriginalFoo = Foo;
  return Bar;
}

@dec
class Foo {
  static #x;
  static #m() {}

  static x;
  static m() {}

  static {
    hasX = o => #x in o;
    hasM = o => #m in o;
  }
}

expect(hasX(Bar)).toBe(true);
expect(hasM(Bar)).toBe(true);
expect(hasX(OriginalFoo)).toBe(false);
expect(hasM(OriginalFoo)).toBe(false);

expect(Bar.hasOwnProperty("x")).toBe(true);
expect(OriginalFoo.hasOwnProperty("x")).toBe(false);

expect(Bar.hasOwnProperty("m")).toBe(false);
expect(OriginalFoo.hasOwnProperty("m")).toBe(true);
