const dec = () => {}; 
let hasX, hasM;

@dec
class Foo {
  static #x;
  static #m() {}

  static x;
  static m() {}

  static {
    hasX = o => #x in o;
    hasM = o => #m in o;
  }
}
