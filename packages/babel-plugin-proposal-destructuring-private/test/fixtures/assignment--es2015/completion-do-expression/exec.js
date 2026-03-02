var result;
class C {
  static #x;
  static {
    var x;
    result = do { ({#x: x = 2} = C); }
  }
}
expect(result).toBe(C);
