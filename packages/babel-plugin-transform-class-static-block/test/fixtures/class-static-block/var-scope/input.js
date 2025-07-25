let res = [];
let foo = 1;
class A {
  static {
    var foo = 3;
  }
  static {
    res.push(foo);
  }
  static x;
  static {
    var foo = 4;
  }
  static {
    res.push(foo);
  }
}
expect(res).toEqual([1, 1]);
