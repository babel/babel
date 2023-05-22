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
}
