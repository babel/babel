class Base {
  static basePublicStaticMethod() { return 1017; }
}

class Sub extends Base {
  static #subStaticPrivateMethod() {
    return super.basePublicStaticMethod();
  }

  static check() {
    return Sub.#subStaticPrivateMethod();
  }
}

expect(Sub.check()).toEqual(1017);