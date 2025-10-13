class C {
  static #p = "#p";
  static a = "a";
  static "0" = "string-zero";
  static 0 = "numeric-zero-updated";
  static 1 = "one";
  static 2n = "two-bigint";
  static {
    var { a, #p: p, a: x, ...r1 } = C;
    console.log(x);
    
    var { "0": y, #p: p2, 0: z, ...r2 } = C;
    console.log(z);
    
    var { 1: m, #p: p3, 1: n, ...r3 } = C;
    console.log(n);
    
    var { 2n: s, #p: p4, 2n: t, ...r4 } = C;
    console.log(t);
    
    var { "0": v1, 1: v2, 2n: v3, #p: p5, ...r5 } = C;
  }
}