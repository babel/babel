function f0(_x, _x2) {
  return _f.apply(this, arguments);
}
function _f() {
  _f = babelHelpers.wrapAsyncGenerator(function* (x) {
    "f0";
  });
  return _f.apply(this, arguments);
}
function f1(_x3, _x4) {
  return _f2.apply(this, arguments);
}
function _f2() {
  _f2 = babelHelpers.wrapAsyncGenerator(function* (_, x) {
    "f1";
  });
  return _f2.apply(this, arguments);
}
function f2(_x5) {
  return _f3.apply(this, arguments);
}
function _f3() {
  _f3 = babelHelpers.wrapAsyncGenerator(function* () {
    "f2";
  });
  return _f3.apply(this, arguments);
}
class C {
  static m0(_x6, _x7) {
    "m0";

    return babelHelpers.wrapAsyncGenerator(function* (x) {}).apply(this, arguments);
  }
  static m1(_x8, _x9) {
    "m1";

    return babelHelpers.wrapAsyncGenerator(function* (_2, x) {}).apply(this, arguments);
  }
  static m2(_x0) {
    "m2";

    return babelHelpers.wrapAsyncGenerator(function* () {}).apply(this, arguments);
  }
}
