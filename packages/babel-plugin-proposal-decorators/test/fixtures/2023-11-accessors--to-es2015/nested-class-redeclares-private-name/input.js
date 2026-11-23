class A {
  #x = 1;
  static getB() {
    return class B {
      accessor #x = 2;
      static read(o) {
        return o.#x;
      }
      static has(o) {
        return #x in o;
      }
    };
  }
}
