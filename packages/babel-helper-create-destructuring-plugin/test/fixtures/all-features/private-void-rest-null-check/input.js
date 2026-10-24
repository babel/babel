class C {
  static #x = 1;
  static m(obj) {
    const { #x: void, ...rest } = obj;
    const { #x: void, a: void, ...rest2 } = obj;
  }
}
