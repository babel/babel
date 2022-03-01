class C {
  static #x;
  static {
    var { "0": { #x: w }, 1: { #x: x }, 2n: {#x: y}, 3m: {#x: z} } = [C, C, C, C];
  }
}
