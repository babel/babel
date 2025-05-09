function f0(_x, _x2) {
  return _f.apply(this, arguments);
}
function _f() {
  _f = babelHelpers.asyncToGenerator(function* (x, _4) {
    "f0";
  });
  return _f.apply(this, arguments);
}
function f1(_x3, _x4) {
  return _f2.apply(this, arguments);
}
function _f2() {
  _f2 = babelHelpers.asyncToGenerator(function* (_5, x) {
    "f1";
  });
  return _f2.apply(this, arguments);
}
function f2(_x5) {
  return _f3.apply(this, arguments);
}
function _f3() {
  _f3 = babelHelpers.asyncToGenerator(function* (_6) {
    "f2";
  });
  return _f3.apply(this, arguments);
}
class C {
  m0(_x6, _x7) {
    "m0";

    return babelHelpers.asyncToGenerator(function* (x, _) {}).apply(this, arguments);
  }
  m1(_x8, _x9) {
    "m1";

    return babelHelpers.asyncToGenerator(function* (_2, x) {}).apply(this, arguments);
  }
  m2(_x0) {
    "m2";

    return babelHelpers.asyncToGenerator(function* (_3) {}).apply(this, arguments);
  }
}
