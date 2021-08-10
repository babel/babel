class Test {

  static #x = 1

  static method() {
    const Test = 2;
    const func = () => {
      const Test = 3;
      return this.#x;
    }
    return func();
  }
}

expect(Test.method()).toBe(1)
