function f0(_x) {
  return _f.apply(this, arguments);
}
function _f() {
  _f = babelHelpers.asyncToGenerator(function* (x) {
    "f0";
  });
  return _f.apply(this, arguments);
}
function f1(_x2, _x3) {
  return _f2.apply(this, arguments);
}
function _f2() {
  _f2 = babelHelpers.asyncToGenerator(function* (_2, x) {
    "f1";
  });
  return _f2.apply(this, arguments);
}
function f2() {
  return _f3.apply(this, arguments);
}
function _f3() {
  _f3 = babelHelpers.asyncToGenerator(function* () {
    "f2";
  });
  return _f3.apply(this, arguments);
}
class C {
  m0(x) {
    "m0";

    return babelHelpers.asyncToGenerator(function* () {})();
  }
  m1() {
    "m1";

    return babelHelpers.asyncToGenerator(function* (_, x) {}).apply(this, arguments);
  }
  m2() {
    "m2";

    return babelHelpers.asyncToGenerator(function* () {})();
  }
}
