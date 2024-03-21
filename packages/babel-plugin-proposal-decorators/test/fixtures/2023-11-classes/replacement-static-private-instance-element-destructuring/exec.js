{
  "instance private destructuring in a static block";
  let getX, getA, callM, staticThis, OriginalFoo;

  class Bar {}

  const dec = (Foo) => {
    OriginalFoo = Foo;
    return Bar;
  };

  @dec
  class Foo {
    #x = "#x";
    accessor #a = "#a";
    #m() { return "#m" }

    static {
      staticThis = this;
      getX = ({ #x: x }) => x;
      getA = ({ #a: a }) => a;
      callM = ({ #m: m }) => m();
    }
  }

  const foo = new OriginalFoo();

  expect(getX(foo)).toBe("#x");
  expect(getA(foo)).toBe("#a");
  expect(callM(foo)).toBe("#m");

  expect(staticThis).toBe(Bar);
}
