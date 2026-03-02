{
  "instance private access in a static block";
  let hasX, getX, setX, hasA, getA, setA, hasM, callM, staticThis, OriginalFoo;

  class Bar {}

  const dec = (Foo) => {
    OriginalFoo = Foo;
    return Bar;
  };

  @dec
  class Foo {
    #x;
    accessor #a;
    #m() { return "#m" }

    x;
    accessor a;
    m() {}

    static {
      staticThis = this;
      hasX = (o) => #x in o;
      getX = (o) => o.#x;
      setX = (o, v) => o.#x = v;
      hasA = (o) => #a in o;
      getA = (o) => o.#a;
      setA = (o, v) => o.#a = v;
      hasM = (o) => #m in o;
      callM = (o) => o.#m();
    }
  }

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
}

{
  "instance private access in a static field initializer";
  let hasX, getX, setX, hasA, getA, setA, hasM, callM, staticThis, OriginalFoo;

  class Bar {}

  const dec = (Foo) => {
    OriginalFoo = Foo;
    return Bar;
  };

  @dec
  class Foo {
    #x;
    accessor #a;
    #m() { return "#m" }

    x;
    accessor a;
    m() {}

    static field = (
      staticThis = this,
      hasX = (o) => #x in o,
      getX = (o) => o.#x,
      setX = (o, v) => o.#x = v,
      hasA = (o) => #a in o,
      getA = (o) => o.#a,
      setA = (o, v) => o.#a = v,
      hasM = (o) => #m in o,
      callM = (o) => o.#m()
    );
  }

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
}

{
  "instance private access in the body of a static private method";
  let hasX, getX, setX, hasA, getA, setA, hasM, callM, staticThis, thisMethodLength, OriginalFoo;

  class Bar {}

  const dec = (Foo) => {
    OriginalFoo = Foo;
    return Bar;
  };

  @dec
  class Foo {
    #x;
    accessor #a;
    #m() { return "#m" }

    x;
    accessor a;
    m() {}

    static #method(_) {
      staticThis = this;
      thisMethodLength = this.#method.length;
      hasX = (o) => #x in o;
      getX = (o) => o.#x;
      setX = (o, v) => o.#x = v;
      hasA = (o) => #a in o;
      getA = (o) => o.#a;
      setA = (o, v) => o.#a = v;
      hasM = (o) => #m in o;
      callM = (o) => o.#m();
    };

    static {
      this.#method()
    }
  }

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

{
  "instance private access in the params of a static private method";
  let hasX, getX, setX, hasA, getA, setA, hasM, callM, staticThis, thisMethodLength, OriginalFoo;

  class Bar {}

  const dec = (Foo) => {
    OriginalFoo = Foo;
    return Bar;
  };

  @dec
  class Foo {
    #x;
    accessor #a;
    #m() { return "#m" }

    x;
    accessor a;
    m() {}

    static #method(v = (
      staticThis = this,
      thisMethodLength = this.#method.length,
      hasX = (o) => #x in o,
      getX = (o) => o.#x,
      setX = (o, v) => o.#x = v,
      hasA = (o) => #a in o,
      getA = (o) => o.#a,
      setA = (o, v) => o.#a = v,
      hasM = (o) => #m in o,
      callM = (o) => o.#m()
    )) {};

    static {
      this.#method()
    }
  }

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

{
  "instance private access in everywhere mentioned above";
  let hasX, getX, setX, hasA, getA, setA, hasM, callM, staticThis, thisMethodLength, OriginalFoo;

  class Bar {}

  const dec = (Foo) => {
    OriginalFoo = Foo;
    return Bar;
  };

  @dec
  class Foo {
    #x;
    accessor #a;
    #m() { return "#m" }

    x;
    accessor a;
    m() {}

    static #method({
      [(staticThis = this, thisMethodLength = this.#method.length, getX = (o) => o.#x)]: _
    } = (
      hasM = (o) => #m in o
    )) {
      hasA = (o) => #a in o;
    }

    static {
      hasX = (o) => #x in o;
      getA = (o) => o.#a;
      callM = (o) => o.#m();
      this.#method();
    }

    static #field = (
      setX = (o, v) => o.#x = v,
      setA = (o, v) => o.#a = v
    );
  }

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
