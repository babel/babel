const dec = () => {};
let hasX, hasA, hasM;

@dec
class Foo {
  static #x;
  static accessor #a;
  static #m() {}

  static x;
  static accessor a;
  static m() {}

  static {
    hasX = o => #x in o;
    hasA = o => #a in o;
    hasM = o => #m in o;
  }
}
