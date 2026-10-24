class C {
  static #x = 1;
  static {
    const [{ #x: a }, void, b] = [C, 2, 3];
    let c, d;
    [{ #x: c }, void, d] = [C, 2, 3];
  }
}
