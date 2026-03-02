{
  let hasX, getX, setX, hasA, getA, setA, hasM, callM, staticThis, thisMethodLength, OriginalFoo;

  class Base {
    static id(v) { return v; }
  }

  class Bar extends Base {}

  const dec = (Foo) => {
    OriginalFoo = Foo;
    return Bar;
  };

  @dec
  class Foo extends class {} {
    #x;
    accessor #a;
    #m() { return "#m" }

    x;
    accessor a;
    m() {}

    static #method(_) {
      staticThis = super.id(this);
      thisMethodLength = super.id(this.#method.length);
      hasX = super.id((o) => #x in o);
      getX = super.id((o) => o.#x);
      setX = super.id((o, v) => o.#x = v);
      hasA = super.id((o) => #a in o);
      getA = super.id((o) => o.#a);
      setA = super.id((o, v) => o.#a = v);
      hasM = super.id((o) => #m in o);
      callM = super.id((o) => o.#m());
    };

    static method() {
      Foo.#method()
    }
  }

  OriginalFoo.method();

  const foo = new OriginalFoo();
  const bar = new Foo();

  expect(hasX(foo)).toBe(true);
  expect(getX((setX(foo, "#x"), foo))).toBe("#x");
  expect(hasA(foo)).toBe(true);
  expect(getA((setA(foo, "#a"), foo))).toBe("#a");
  expect(hasM(foo)).toBe(true);
  expect(callM(foo)).toBe("#m");
  expect(hasX(bar)).toBe(false);
  expect(hasA(bar)).toBe(false);
  expect(hasM(bar)).toBe(false);

  expect(foo.hasOwnProperty("x")).toBe(true);
  expect(bar.hasOwnProperty("x")).toBe(false);

  expect(OriginalFoo.prototype.hasOwnProperty("a")).toBe(true);
  expect(Bar.prototype.hasOwnProperty("a")).toBe(false);
  expect(OriginalFoo.prototype.hasOwnProperty("m")).toBe(true);
  expect(Bar.prototype.hasOwnProperty("m")).toBe(false);

  expect(staticThis).toBe(Bar);
  expect(thisMethodLength).toBe(1);
}
