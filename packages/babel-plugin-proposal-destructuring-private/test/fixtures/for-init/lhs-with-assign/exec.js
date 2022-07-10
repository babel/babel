let result;
class C {
  static #x = 42;
  static {
    let x, y;
    for ({ #x: x } = { #x: y } = C;;) {
      result = { x, y };
      break;
    }
  }
}
expect(result).toStrictEqual({ x: 42, y: 42});
