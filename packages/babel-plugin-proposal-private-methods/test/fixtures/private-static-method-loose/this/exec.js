class Cl {
  static staticField = 'staticFieldString'

  static #staticPrivateMethod() {
    return this.staticField;
  }

  static check() {
    return this.#staticPrivateMethod();
  }
}

expect(Cl.check()).toEqual('staticFieldString');
