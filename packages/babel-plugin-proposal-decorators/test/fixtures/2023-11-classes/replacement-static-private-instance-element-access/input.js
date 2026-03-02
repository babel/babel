const dec = () => {};
let hasX, hasA, hasM;

@dec
class Foo {
  #x;
  accessor #a;
  #m() {}

  x;
  accessor a;
  m() {}

  static {
    hasX = o => #x in o;
    hasA = o => #a in o;
    hasM = o => #m in o;
  }
}

