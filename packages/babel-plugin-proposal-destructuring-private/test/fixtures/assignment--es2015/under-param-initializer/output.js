var _m2, _class;
let a;
class C {
  static m(r = (_m2 = C, ({
    a
  } = babelHelpers.classStaticPrivateFieldSpecGet(_m2, C, _x)), _m2)) {}
}
_class = C;
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
  (function f(r = (_m = _class, ({
    b
  } = babelHelpers.classStaticPrivateFieldSpecGet(_m, _class, _x)), _m)) {})();
})();
C.m();
