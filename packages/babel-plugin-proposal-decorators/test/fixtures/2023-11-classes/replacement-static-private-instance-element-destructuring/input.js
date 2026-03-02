const dec = () => {};
let getX, getA, callM;

@dec
class Foo {
  #x = "#x";
  accessor #a = "#a";
  #m() { return "#m" }

  static {
    staticThis = this;
    getX = ({ #x: x }) => x;
    getA = ({ #a: a }) => a;
    callM = ({ #m: m }) => m();
  }
}

