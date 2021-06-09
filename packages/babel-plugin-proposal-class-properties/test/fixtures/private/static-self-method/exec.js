const f = class Foo {
  static #bar() {
    return Foo;
  }

  static #method() {
    return function inner() {
      return Foo;
    };
  }
  static #method_shadowed() {
    new Foo();
    return function inner() {
      let Foo = 3;
      return Foo;
    }
  }

  static extract() {
    return {
      bar: Foo.#bar,
      method: Foo.#method,
      method_shadowed: Foo.#method_shadowed
    }
  }
};

const { bar, method, method_shadowed } = f.extract();
expect(bar()).toBe(f)
expect(method()()).toBe(f)
expect(method_shadowed()()).toBe(3)
