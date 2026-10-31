var _C;
let a;
class C {
  static m(r = ({
    a
  } = _x._, C)) {}
}
_C = C;
var _x = {
  _: {
    a: 1,
    b: 2
  }
};
(() => {
  let b;
  (function f(r = ({
    b
  } = _x._, _C)) {})();
})();
C.m();
