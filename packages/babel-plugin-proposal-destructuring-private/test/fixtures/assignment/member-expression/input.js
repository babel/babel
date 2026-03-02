let x;
class C {
  static #x;
  static #y;
  static #z;
  static {
    let z;
    ([C.#x, { #x: x }, ...z] = [0, C]);
  }
}
