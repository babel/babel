class C {
  static #x = "x";
  static #y = [];
  static #z;
  static self = C;
  static #self() { return C }
  static {
    var [{ #x: x } = C.self, { #y: [,{ #z: y = C.#self() } = C.self ] },,z = y.#y] = [this,this];
  }
}
