class X {
  #privateMethod() {
    return 1;
  }
  #privateMethod2() {
    return 2;
  }
  method1() {
    return this.#privateMethod();
  }
  method2() {
    return this.#privateMethod2();
  }
}

const x = new X();
expect(x.method1()).toBe(1);
expect(x.method2()).toBe(2);
