class C {
  static 0(..._p) {
    var [..._p2] = _p,
      x = babelHelpers.assertClassBrand(C, _p2[0], _x)._;
  }
  static 1(a, b = 1, _p3, ..._p4) {
    var x = babelHelpers.assertClassBrand(C, _p3, _x)._,
      c = _p4;
  }
  static 2(a, b, _p5) {
    var x = babelHelpers.assertClassBrand(C, _p5 === void 0 ? C : _p5, _x)._;
  }
  static 3(a, b, _p6, _p7) {
    var x = babelHelpers.assertClassBrand(C, _p6, _x)._,
      c = _p7 === void 0 ? 1 : _p7;
  }
}
var _x = {
  _: void 0
};
