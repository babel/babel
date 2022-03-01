let result;
class C {
  static #y = "y";
  static #z = "self";
  static #x;
  static b = "b";
  static self = C;
  static #self = C;
  static {
    let cloned, b, y, yy, yy2;
    ({ #x: { [C.#z]: { b, #x: y = (C.b = "bb", C.#self.#y) }, #x: yy = (delete C.self, { ...cloned } = C, C.#y = "yy") } = C.#self, #y: yy2 } = C);
    result = { b, y, yy, cloned, yy2 };
  }
}
expect(result).toStrictEqual({
  b: "b",
  y: "y",
  yy: "yy",
  cloned: { b: "bb" },
  yy2: "yy"
})
