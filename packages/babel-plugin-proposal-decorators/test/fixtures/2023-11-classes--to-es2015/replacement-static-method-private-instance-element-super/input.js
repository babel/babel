const dec = () => {};
let hasX, hasA, hasM;

class Base {
  static id(v) { return v; }
}

@dec
class Foo extends Base {
  #x;
  accessor #a;
  #m() {}

  x;
  accessor a;
  m() {}

  static #method() {
    super.id(this);
    hasX = o => #x in o;
    hasA = o => #a in o;
    hasM = o => #m in o;
  }
}

