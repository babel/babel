class C {
  static #x = 1;
  static y = 2;
  static {
    const { #x: void, y } = C;
    expect(y).toBe(2);
    expect(() => { const { #x: void } = null; }).toThrow(TypeError);
  }
}
