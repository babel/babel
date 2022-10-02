var _m2;
let a;
class C {
  static m(r = (_m2 = C, ({
    a
  } = babelHelpers.classStaticPrivateFieldSpecGet(_m2, C, _x)), _m2)) {}
}
var _x = {
  writable: true,
  value: {
    a: 1,
    b: 2
  }
};
(() => {
  var _m;
  let b;
  (function f(r = (_m = C, ({
    b
  } = babelHelpers.classStaticPrivateFieldSpecGet(_m, C, _x)), _m)) {})();
})();
C.m();
