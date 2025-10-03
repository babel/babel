class C {
  static #p = "#p";
  static a = "a";
  static {
    var { a, #p: p, a: x, ...r } = C;
    console.log(x);
  }
}
