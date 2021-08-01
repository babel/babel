var foo = "bar", fox = 2;

class Foo {
  #bar = foo;

  x;

  #baz = fox;

  constructor() {
    var foo = "foo";
    var fox = 3;
  }

  getBar() {
    return this.#bar;
  }

  getBaz() {
    return this.#baz;
  }
}

const cl = new Foo();
expect(cl.getBar()).toBe("bar");
expect(cl.getBaz()).toBe(2);
